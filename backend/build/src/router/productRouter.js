"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const ProductController_1 = require("../controller/ProductController");
const ProductBusiness_1 = require("../business/ProductBusiness");
const ProductDatabase_1 = require("../database/ProductDatabase");
exports.productRouter = (0, express_1.Router)();
const productController = new ProductController_1.ProductController(new ProductBusiness_1.ProductBusiness(new ProductDatabase_1.ProductDatabase()));
exports.productRouter.get("/", productController.getProducts);
//# sourceMappingURL=productRouter.js.map