"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pizza = void 0;
class Pizza {
    constructor(name, price, ingredients) {
        this.name = name;
        this.price = price;
        this.ingredients = ingredients;
        this.getName = () => {
            return this.name;
        };
        this.getPrice = () => {
            return this.price;
        };
        this.getIngredients = () => {
            return this.ingredients;
        };
        this.setName = (newName) => {
            this.name = newName;
        };
        this.setPrice = (newPrice) => {
            this.price = newPrice;
        };
        this.setIngredients = (newIngredients) => {
            this.ingredients = newIngredients;
        };
        this.addIngredient = (newIngredient) => {
            this.ingredients.push(newIngredient);
        };
        this.deleteIngredient = (delIngredient) => {
            return this.ingredients.filter((ingredient) => ingredient !== delIngredient);
        };
    }
}
exports.Pizza = Pizza;
//# sourceMappingURL=Pizza.js.map