import { Router } from "express";
import { ProductController } from "../controller/ProductController";
import { ProductBusiness } from "../business/ProductBusiness";
import { ProductDatabase } from "../database/ProductDatabase";

export const productRouter = Router();

const productController = new ProductController(
  new ProductBusiness(new ProductDatabase())
);

productRouter.put("/", productController.getProducts);
