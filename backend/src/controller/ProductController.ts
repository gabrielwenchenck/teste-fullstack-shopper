import { Request, Response } from "express";
import { BaseError } from "../errors/BaseError";
import { ProductBusiness } from "../business/ProductBusiness";
import { IUpdateProductInputDTO } from "../models/Product";

export class ProductController {
  constructor(private productBusiness: ProductBusiness) {}

  public getProducts = async (req: Request, res: Response) => {
    const input: IUpdateProductInputDTO = {
      products: req.body.products,
    };
    try {
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
}
