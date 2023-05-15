import { IPizzaDB, IPizzasIngredientsDB, Pizza } from "../models/Pizza";
import { IProductDB, Product } from "../models/Product";
import { BaseDatabase } from "./BaseDatabase";

export class ProductDatabase extends BaseDatabase {
  public static TABLE_PRODUCT = "product";
  public static TABLE_PACK = "pack";

  public toProductDBModel = (product: Product): IProductDB => {
    const productDB: IProductDB = {
      code: product.getCode(),
      name: product.getName(),
      cost_price: product.getCostPrice(),
      sales_price: product.getSalesPrice(),
    };

    return productDB;
  };

  // public getProducts = async (input: IProductInputDTO[]) => {
  //   const productDB = await BaseDatabase.connection(ProductDatabase.TABLE_PRODUCT)
  //     .select("*")
  //     .where({
  //       code: product_code,
  //     });
  //   .update({ sales_price: new_price });

  //   return result;
  // };

  // public getProducts = async (input: IProductInputDTO[]) => {

  //   const productsDB: IProductDB[] = await BaseDatabase.connection(
  //     ProductDatabase.TABLE_PRODUCT
  //   )
  //     .select()
  //     .where({ code: product_code });

  //   return productsDB;
  // };

  public editPrice = async (pr: Product) => {
    const productDB: IProductDB = {
      code: pr.getCode(),
      name: pr.getName(),
      cost_price: pr.getCostPrice(),
      sales_price: pr.getSalesPrice(),
    };

    await BaseDatabase.connection(ProductDatabase.TABLE_PRODUCT)
      .update(productDB)
      .where({ code: productDB.code });
    console.log(productDB);
  };

  public updatePrice = async (
    newPrice: number,
    productCode: number
  ): Promise<void> => {
    await BaseDatabase.connection(ProductDatabase.TABLE_PRODUCT)
      .update({
        sales_price: newPrice,
      })
      .where({ code: productCode });
  };

  public getProducts = async (product_code: number[]) => {
    const result = await BaseDatabase.connection(ProductDatabase.TABLE_PRODUCT)
      .select("*")
      .whereIn("code", product_code);

    return result;
  };

  // public getIngredients = async (pizzaName: string): Promise<string[]> => {
  //   const result: IPizzasIngredientsDB[] = await BaseDatabase.connection(
  //     PizzaDatabase.TABLE_PIZZAS_INGREDIENTS
  //   )
  //     .select("ingredient_name")
  //     .where({ pizza_name: pizzaName });

  //   return result.map((item) => item.ingredient_name);
  // };
}
