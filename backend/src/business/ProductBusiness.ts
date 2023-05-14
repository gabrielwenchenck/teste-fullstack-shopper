import { IGetProducts, IProductInputDTO, Product } from "./../models/Product";
import { response } from "express";
import { ProductDatabase } from "../database/ProductDatabase";
import { NotFoundError } from "../errors/NotFoundError";
import { IProductDB } from "../models/Product";
export class ProductBusiness {
  constructor(private productDatabase: ProductDatabase) {}

  public getProducts = async (input: IProductInputDTO[]) => {
    const [{ product_code, new_price }] = input;

    const productsDB = await this.productDatabase.getProducts(
      product_code,
      new_price
    );
    console.log(productsDB);

    // const products = [];

    // for (const productDB of productsDB) {
    //   const product = new Product(
    //     productDB.code,
    //     productDB.name,
    //     productDB.cost_price,
    //     productDB.sales_price
    //   );

    //   const newSalesPrice = new_price;

    //   product.setSalesPrice(newSalesPrice);
    //   products.push(product);
    // }

    // if (!productsDB) {
    //   throw new NotFoundError();
    // }

    // const response: IGetProducts = { products: productsDB };
    // console.log(response);
    // return response;
  };
}
