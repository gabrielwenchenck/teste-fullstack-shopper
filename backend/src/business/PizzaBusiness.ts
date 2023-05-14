// import { Pizza } from "./../models/Pizza";
// import { IdGenerator } from "./../services/IdGenerator";
// import { PizzaDatabase } from "./../database/PizzaDatabase";
// import { IGetPizzasOutputDTO } from "../models/Pizza";
// export class PizzaBusiness {
//   constructor(
//     private pizzaDatabase: PizzaDatabase,
//     private idGenerator: IdGenerator
//   ) {}

//   public getPizzas = async (): Promise<any> => {
//     const pizzasDB = await this.pizzaDatabase.getPizzas();

//     const pizzas: Pizza[] = [];

//     for (const pizzaDB of pizzasDB) {
//       const pizza = new Pizza(pizzaDB.name, pizzaDB.price, []);

//       const ingredients = await this.pizzaDatabase.getIngredients(pizzaDB.name);

//       pizza.setIngredients(ingredients);
//       pizzas.push(pizza);
//     }

//     const response: IGetPizzasOutputDTO = {
//       message: "Pizzas retornadas com sucesso",
//       pizzas: pizzas.map((pizza) => ({
//         name: pizza.getName(),
//         price: pizza.getPrice(),
//         ingredients: pizza.getIngredients(),
//       })),
//     };

//     return response;
//   };
// }
