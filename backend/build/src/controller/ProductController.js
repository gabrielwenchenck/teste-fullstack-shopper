"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const BaseError_1 = require("../errors/BaseError");
class ProductController {
    constructor(productBusiness) {
        this.productBusiness = productBusiness;
        this.getProducts = async (req, res) => {
            try {
                const response = await this.productBusiness.getProducts();
                res.status(200).send(response);
            }
            catch (error) {
                console.log(error);
                if (error instanceof BaseError_1.BaseError) {
                    return res.status(error.statusCode).send({ message: error.message });
                }
                res.status(500).send({ message: "Erro ao buscar produtos" });
            }
        };
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map