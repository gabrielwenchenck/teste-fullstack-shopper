import { ProductBusiness } from "../business/ProductBusiness";
import { IUpdateProductInputDTO } from "./../models/Product";
import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import csvParser from "csv-parser";
import fs from "fs";
import { BaseError } from "../errors/BaseError";

export class ProductController {
  constructor(private productBusiness: ProductBusiness) {}

  public uploadProduct = async (req: Request, res: Response) => {
    try {
      const file = req.files?.file as UploadedFile;
      const fileContent = file.data.toString();
      const products = await this.parseCsv(fileContent);
      const input: IUpdateProductInputDTO = { products };
      console.log(products);
      const response = await this.productBusiness.updateProduct(input);
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      res.status(500).send({ message: "Erro ao buscar produtos" });
    }
  };

  private parseCsv = (
    csvContent: string
  ): Promise<{ product_code: number; new_price: number }[]> => {
    return new Promise((resolve, reject) => {
      const products: { product_code: number; new_price: number }[] = [];

      const tempFilePath = "./temp.csv";
      fs.writeFileSync(tempFilePath, csvContent);

      fs.createReadStream(tempFilePath)
        .pipe(csvParser())
        .on("data", (data) => {
          const { product_code, new_price } = data;
          products.push({
            product_code: parseInt(product_code),
            new_price: parseFloat(new_price),
          });
        })
        .on("end", () => {
          fs.unlinkSync(tempFilePath);

          resolve(products);
        })
        .on("error", (error) => {
          fs.unlinkSync(tempFilePath);

          reject(error);
        });
    });
  };
}
