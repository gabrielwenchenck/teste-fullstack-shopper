"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDatabase = void 0;
const BaseDatabase_1 = require("./BaseDatabase");
class ProductDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.toPizzaDBModel = (pizza) => {
            const pizzaDB = {
                name: pizza.getName(),
                price: pizza.getPrice(),
            };
            return pizzaDB;
        };
        this.getProducts = async () => {
            const result = await BaseDatabase_1.BaseDatabase.connection(ProductDatabase.TABLE_PRODUCT).select("*");
            return result;
        };
    }
}
exports.ProductDatabase = ProductDatabase;
ProductDatabase.TABLE_PRODUCT = "product";
ProductDatabase.TABLE_PACK = "pack";
//# sourceMappingURL=ProductDatabase.js.map