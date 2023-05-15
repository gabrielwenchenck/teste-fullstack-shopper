import {
  IGetProducts,
  IUpdateProductInputDTO,
  IUpdateProductOutputDTO,
  Product,
} from "./../models/Product";
import { response } from "express";
import { ProductDatabase } from "../database/ProductDatabase";
import { NotFoundError } from "../errors/NotFoundError";
import { IProductDB } from "../models/Product";
import { IGetOrdersOutputDTO } from "../models/Order";
export class ProductBusiness {
  constructor(private productDatabase: ProductDatabase) {}

  /*public updateProduct = async (input: IUpdateProductInputDTO) => {
    const productsInput = input.products;

    const products = productsInput.map((product) => {
      return product;
    });

    for (const product of products) {
      await this.productDatabase.updatePrice(
        product.sales_price,
        product.product_code
      );
      const productsDB = await this.productDatabase.getProducts(
        product.product_code
      );

      const productsRes = new Product(
        productsDB.code,
        productsDB.name,
        productsDB.cost_price,
        productsDB.sales_price
      );

      const response = {
        code: productsRes.getCode(),
        name: productsRes.getName(),
        cost_price: productsRes.getCostPrice(),
        sales_price: productsRes.getSalesPrice(),
      };
      console.log(response);

    }

    
  }; */

  public updateProduct = async (input: IUpdateProductInputDTO) => {
    const productsInput = input.products;

    const updatePromises = productsInput.map(async (product) => {
      await this.productDatabase.updatePrice(
        product.sales_price,
        product.product_code
      );
    });

    await Promise.all(updatePromises);

    const productCodes = productsInput.map((product) => product.product_code);
    const productsDB = await this.productDatabase.getProducts(productCodes);

    const response = productsDB.map((productDB) => ({
      code: productDB.code,
      name: productDB.name,
      cost_price: productDB.cost_price,
      sales_price: productDB.sales_price,
    }));

    return response;
  };
}
