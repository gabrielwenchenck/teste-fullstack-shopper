import { ProductDatabase } from "../database/ProductDatabase";
import { ParamsError } from "../errors/ParamsError";
import {
  IUpdateProductInputDTO,
  IUpdateProductOutputDTO,
} from "../models/Product";

export class ProductBusiness {
  constructor(private productDatabase: ProductDatabase) {}

  public updateProduct = async (
    input: IUpdateProductInputDTO
  ): Promise<IUpdateProductOutputDTO> => {
    const productsInput = input.products;

    const productCodes = productsInput.map(
      (productInput) => productInput.product_code
    );
    const productsDB = await this.productDatabase.getProducts(productCodes);

    const updatePromises = productsInput.map(async (productInput) => {
      const { product_code, new_price } = productInput;

      const productDB = productsDB.find(
        (product) => product.code === product_code
      );
      if (!productDB) {
        return null; // Produto não encontrado
      }

      const { code, name, sales_price, cost_price } = productDB;

      const current_price = sales_price as number;
      const updated_price = new_price !== undefined ? new_price : sales_price;

      if (updated_price < cost_price) {
        throw new ParamsError(
          "O novo preço não pode ser inferior ao preço de custo"
        );
      }

      const priceIncrease = current_price * 0.1; // 10% do preço atual
      const priceDecrease = current_price * -0.1; // -10% do preço atual

      const priceDifference = updated_price - current_price;
      if (priceDifference > priceIncrease || priceDifference < priceDecrease) {
        throw new ParamsError(
          "O reajuste não pode ser maior ou menor do que 10% do preço atual do produto"
        );
      }

      if (updated_price < cost_price) {
        throw new ParamsError(
          "O novo preço não pode ser inferior ao preço de custo"
        );
      }

      await this.productDatabase.updatePrice(updated_price, product_code);

      // Atualizar os preços dos componentes dos pacotes
      const pack = await this.productDatabase.getPackByProductCode(
        product_code
      );

      const packSalesPrice = updated_price;

      if (pack) {
        const components = await this.productDatabase.getComponentsByPackId(
          pack.pack_id
        );

        if (components.length > 0) {
          const updatedComponents = components.map(async (component) => {
            const product = await this.productDatabase.getProductByCode(
              component.product_id
            );
            if (product) {
              const currentPrice = product.sales_price as number;
              const componentQty = component.qty as number;

              // Verificar se o current_price do componente já foi atualizado antes
              if (currentPrice === sales_price) {
                // Calcular o novo current_price do produto com base no sales_price do pacote
                const updatedProductPrice = packSalesPrice / componentQty;

                if (updatedProductPrice < product.cost_price) {
                  throw new ParamsError(
                    "O novo preço do componente é inferior ao preço de custo"
                  );
                }

                await this.productDatabase.updatePrice(
                  updatedProductPrice,
                  component.product_id
                );
              }
            }
          });

          await Promise.all(updatedComponents);
        }
      }

      return {
        code: code as number,
        name: name as string,
        current_price,
        new_price: updated_price,
      };
    });

    const updatedProducts = await Promise.all(updatePromises);
    const validProductsInfo = updatedProducts.filter(
      (productInfo) => productInfo !== null
    ) as {
      code: number;
      name: string;
      current_price: number;
      new_price: number;
    }[];

    const response: IUpdateProductOutputDTO = {
      message: "Produtos atualizados com sucesso",
      products: validProductsInfo,
    };
    console.log(response);
    return response;
  };
}

/*import {
  IUpdateProductInputDTO,
  IUpdateProductOutputDTO,
} from "../models/Product";
import { ProductDatabase } from "../database/ProductDatabase";
import { ParamsError } from "../errors/ParamsError";

export class ProductBusiness {
  constructor(private productDatabase: ProductDatabase) {}

  public updateProduct = async (
    input: IUpdateProductInputDTO
  ): Promise<IUpdateProductOutputDTO> => {
    const productsInput = input.products;

    const productCodes = productsInput.map(
      (productInput) => productInput.product_code
    );
    const productsDB = await this.productDatabase.getProducts(productCodes);

    const updatePromises = productsInput.map(async (productInput) => {
      const { product_code, new_price } = productInput;

      const productDB = productsDB.find(
        (product) => product.code === product_code
      );
      if (!productDB) {
        return null; // Produto não encontrado
      }

      const { code, name, sales_price, cost_price } = productDB;

      const current_price = sales_price as number;
      const updated_price = new_price !== undefined ? new_price : sales_price;

      if (updated_price < cost_price) {
        throw new ParamsError(
          "O novo preço não pode ser inferior ao preço de custo"
        );
      }

      await this.productDatabase.updatePrice(updated_price, product_code);

      // Atualizar os preços dos componentes dos pacotes
      const pack = await this.productDatabase.getPackByProductCode(
        product_code
      );

      if (pack) {
        const components = await this.productDatabase.getComponentsByPackId(
          pack.pack_id
        );

        if (components.length > 0) {
          const updatedComponents = components.map(async (component) => {
            const product = await this.productDatabase.getProductByCode(
              component.product_id
            );
            if (product) {
              const currentPrice = product.sales_price as number;
              const componentQty = component.qty as number;
              const packSalesPrice = updated_price;

              // Calcular o novo current_price do produto com base no sales_price do pacote
              const updatedProductPrice = packSalesPrice / componentQty;

              if (updatedProductPrice < product.cost_price) {
                throw new ParamsError(
                  "O novo preço do componente é inferior ao preço de custo"
                );
              }

              await this.productDatabase.updatePrice(
                updatedProductPrice,
                component.product_id
              );
            }
          });

          await Promise.all(updatedComponents);
        }
      }

      return {
        code: code as number,
        name: name as string,
        current_price,
        new_price: updated_price,
      };
    });

    const updatedProducts = await Promise.all(updatePromises);
    const validProductsInfo = updatedProducts.filter(
      (productInfo) => productInfo !== null
    ) as {
      code: number;
      name: string;
      current_price: number;
      new_price: number;
    }[];

    const response: IUpdateProductOutputDTO = {
      message: "Produtos atualizados com sucesso",
      products: validProductsInfo,
    };
    console.log(response);
    return response;
  };
}*/

// import {
//   IGetProducts,
//   IUpdateProductInputDTO,
//   IUpdateProductOutputDTO,
//   Product,
// } from "./../models/Product";
// import { response } from "express";
// import { ProductDatabase } from "../database/ProductDatabase";
// import { NotFoundError } from "../errors/NotFoundError";
// import { IProductDB } from "../models/Product";
// import { IGetOrdersOutputDTO } from "../models/Order";
// import { ParamsError } from "../errors/ParamsError";
// export class ProductBusiness {
//   constructor(private productDatabase: ProductDatabase) {}

//   public updateProduct = async (
//     input: IUpdateProductInputDTO
//   ): Promise<IUpdateProductOutputDTO> => {
//     const productsInput = input.products;

//     const productCodes = productsInput.map(
//       (productInput) => productInput.product_code
//     );
//     const productsDB = await this.productDatabase.getProducts(productCodes);

//     const updatePromises = productsInput.map(async (productInput) => {
//       const { product_code, new_price } = productInput;

//       const productDB = productsDB.find(
//         (product) => product.code === product_code
//       );
//       if (!productDB) {
//         return null; // Produto não encontrado
//       }

//       const { code, name, sales_price, cost_price } = productDB;

//       const current_price = sales_price as number;
//       console.log(new_price);
//       const updated_price = new_price !== undefined ? new_price : sales_price;

//       // if (updated_price < cost_price) {
//       //   throw new ParamsError(
//       //     "O novo preço não pode ser inferior ao preço de custo"
//       //   );
//       // }

//       // const priceIncrease = current_price * 0.1; // 10% do preço atual
//       // const priceDecrease = current_price * -0.1; // -10% do preço atual

//       // const priceDifference = updated_price - current_price;
//       // if (priceDifference > priceIncrease || priceDifference < priceDecrease) {
//       //   throw new ParamsError(
//       //     "O reajuste não pode ser maior ou menor do que 10% do preço atual do produto"
//       //   );
//       // }

//       await this.productDatabase.updatePrice(updated_price, product_code);

//       // Atualizar os preços dos componentes dos pacotes
//       const pack = await this.productDatabase.getPackByProductCode(
//         product_code
//       );

//       if (pack) {
//         const components = await this.productDatabase.getComponentsByPackId(
//           pack.pack_id
//         );

//         if (components.length > 0) {
//           const updatedComponents = components.map(async (component) => {
//             const product = await this.productDatabase.getProductByCode(
//               component.product_id
//             );
//             if (product) {
//               const currentPrice = product.sales_price as number;
//               const componentQty = component.qty as number;
//               const updatedComponentPrice = new_price / componentQty;

//               if (updatedComponentPrice < product.cost_price) {
//                 throw new ParamsError(
//                   "O novo preço do componente é inferior ao preço de custo"
//                 );
//               }

//               await this.productDatabase.updatePrice(
//                 updatedComponentPrice,
//                 component.product_id
//               );
//               const updatedProductPrice = updatedComponentPrice * componentQty;
//               await this.productDatabase.updatePrice(
//                 updatedProductPrice,
//                 product.code
//               );
//             }
//           });

//           await Promise.all(updatedComponents);
//         }
//       }
//       await this.productDatabase.updatePrice(new_price, product_code);

//       return {
//         code: code as number,
//         name: name as string,
//         current_price,
//         new_price: updated_price,
//       };
//     });

//     const updatedProducts = await Promise.all(updatePromises);
//     const validProductsInfo = updatedProducts.filter(
//       (productInfo) => productInfo !== null
//     ) as {
//       code: number;
//       name: string;
//       current_price: number;
//       new_price: number;
//     }[];

//     const response: IUpdateProductOutputDTO = {
//       message: "Produtos atualizados com sucesso",
//       products: validProductsInfo,
//     };

//     console.log(response);
//     return response;
//   };
// }

/*import {
  IUpdateProductInputDTO,
  IUpdateProductOutputDTO,
} from "../models/Product";
import { ProductDatabase } from "../database/ProductDatabase";
import { ParamsError } from "../errors/ParamsError";

export class ProductBusiness {
  constructor(private productDatabase: ProductDatabase) {}

  public updateProduct = async (
    input: IUpdateProductInputDTO
  ): Promise<IUpdateProductOutputDTO> => {
    const productsInput = input.products;

    const productCodes = productsInput.map(
      (productInput) => productInput.product_code
    );
    const productsDB = await this.productDatabase.getProducts(productCodes);

    const updatePromises = productsInput.map(async (productInput) => {
      const { product_code, new_price } = productInput;

      const productDB = productsDB.find(
        (product) => product.code === product_code
      );
      if (!productDB) {
        return null; // Produto não encontrado
      }

      const { code, name, sales_price, cost_price } = productDB;

      const current_price = sales_price as number;
      const updated_price = new_price !== undefined ? new_price : sales_price;

      // Atualizar o price do pack
      await this.productDatabase.updatePrice(product_code, updated_price);

      // Atualizar o preço do produto relacionado no pack
      const pack = await this.productDatabase.getPackByProductCode(
        product_code
      );

      if (pack) {
        const packQty = pack.qty as number;
        const productPriceRatio = updated_price / packQty;

        // Atualizar o price do produto relacionado
        await this.productDatabase.updatePrice(
          productPriceRatio,
          pack.product_id
        );

        // Verificar se o valor do produto é proporcional ao valor do pack
        const relatedProductDB = await this.productDatabase.getProductByCode(
          pack.product_id
        );

        if (!relatedProductDB) {
          throw new Error(
            "Produto relacionado não encontrado na base de dados."
          );
        }

        const relatedProductPrice = relatedProductDB.sales_price as number;

        if (Math.abs(relatedProductPrice - productPriceRatio) > 0.01) {
          throw new Error(
            "Erro: O valor do produto não está proporcional ao valor do pack."
          );
        }
      }

      return {
        code: code as number,
        name: name as string,
        current_price,
        new_price: updated_price,
      };
    });

    const updatedProducts = await Promise.all(updatePromises);
    const validProductsInfo = updatedProducts.filter(
      (productInfo) => productInfo !== null
    ) as {
      code: number;
      name: string;
      current_price: number;
      new_price: number;
    }[];

    const response: IUpdateProductOutputDTO = {
      message: "Produtos atualizados com sucesso",
      products: validProductsInfo,
    };

    console.log(response);
    return response;
  };
}*/
