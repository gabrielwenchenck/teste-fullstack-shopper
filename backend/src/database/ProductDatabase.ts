import { BaseDatabase } from "./BaseDatabase";

export class ProductDatabase extends BaseDatabase {
  public static TABLE_PRODUCT = "product";
  public static TABLE_PACK = "pack";

  public updatePrice = async (
    newPrice: number,
    productCode: number
  ): Promise<void> => {
    console.log(newPrice, productCode);
    await BaseDatabase.connection(ProductDatabase.TABLE_PRODUCT)
      .update({
        sales_price: newPrice,
      })
      .where({ code: productCode });

    await BaseDatabase.connection(ProductDatabase.TABLE_PACK)
      .join(
        ProductDatabase.TABLE_PRODUCT,
        `${ProductDatabase.TABLE_PACK}.product_id`,
        "=",
        `${ProductDatabase.TABLE_PRODUCT}.code`
      )
      .update({
        sales_price: newPrice,
      })
      .where(`${ProductDatabase.TABLE_PACK}.pack_id`, "=", productCode);
  };

  public getProducts = async (product_code: number[]) => {
    const result = await BaseDatabase.connection(ProductDatabase.TABLE_PRODUCT)
      .select("*")
      .whereIn("code", product_code);

    return result;
  };

  public getProductByCode = async (productCode: number) => {
    const result = await BaseDatabase.connection(ProductDatabase.TABLE_PRODUCT)
      .where("code", "=", productCode)
      .first();

    return result;
  };

  // public getProductByCode = async (productCode: number) => {
  //   const result = await BaseDatabase.connection(ProductDatabase.TABLE_PRODUCT)
  //     .join(
  //       ProductDatabase.TABLE_PRODUCT,
  //       `${ProductDatabase.TABLE_PRODUCT}.code`,
  //       "=",
  //       `${ProductDatabase.TABLE_PACK}.id`
  //     )
  //     .select(`${ProductDatabase.TABLE_PRODUCT}.*`) // Retorna todas as colunas do produto
  //     .where(`${ProductDatabase.TABLE_PACK}.product_id`, "=", productCode)
  //     .first();

  //   return result;
  // };

  public getPackByProductCode = async (productCode: number) => {
    const result = await BaseDatabase.connection(ProductDatabase.TABLE_PACK)
      .join(
        ProductDatabase.TABLE_PRODUCT,
        `${ProductDatabase.TABLE_PRODUCT}.code`,
        "=",
        `${ProductDatabase.TABLE_PACK}.id`
      )
      .select(`${ProductDatabase.TABLE_PRODUCT}.*`) // Retorna todas as colunas do produto
      .where(`${ProductDatabase.TABLE_PACK}.product_id`, "=", productCode)
      .first();

    return result;
  };

  // public getComponentsByPackId = async (pack_id: number) => {
  //   const result = await BaseDatabase.connection(ProductDatabase.TABLE_PACK)
  //     .join(
  //       ProductDatabase.TABLE_PRODUCT,
  //       `${ProductDatabase.TABLE_PRODUCT}.code`,
  //       "=",
  //       `${ProductDatabase.TABLE_PACK}.product_id`
  //     )
  //     .select(`${ProductDatabase.TABLE_PRODUCT}.*`) // Retorna todas as colunas do produto
  //     .where(`${ProductDatabase.TABLE_PACK}.product_id`, "=", pack_id);

  //   return result;
  // };

  public getComponentsByPackId = async (pack_id: number) => {
    const result = await BaseDatabase.connection(ProductDatabase.TABLE_PACK)
      .join(
        ProductDatabase.TABLE_PRODUCT,
        `${ProductDatabase.TABLE_PACK}.product_id`,
        "=",
        `${ProductDatabase.TABLE_PRODUCT}.code`
      )
      .select(`${ProductDatabase.TABLE_PRODUCT}.code AS product_id`)
      .where(`${ProductDatabase.TABLE_PACK}.pack_id`, "=", pack_id);

    return result;
  };
}
