import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { ProductBusiness } from "../business/ProductBusiness";
import { IProductInputDTO } from "../models/Product";

export class ProductController {
  constructor(private productBusiness: ProductBusiness) {}

  public getProducts = async (req: Request, res: Response) => {
    const input: IProductInputDTO[] = [
      {
        product_code: 16,
        new_price: 25.5,
      },
      { product_code: 18, new_price: 13 },
    ];
    try {
      const response = await this.productBusiness.getProducts(input);
      res.status(200).send(response);
    } catch (error) {
      console.log(error);
      if (error instanceof BaseError) {
        return res.status(error.statusCode).send({ message: error.message });
      }
      res.status(500).send({ message: "Erro ao buscar produtos" });
    }
  };
}
