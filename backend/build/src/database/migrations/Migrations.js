"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ProductDatabase_1 = require("./../ProductDatabase");
const data_1 = require("./data");
const BaseDatabase_1 = require("../BaseDatabase");
class Migrations extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.execute = async () => {
            try {
                console.log("Creating tables...");
                await this.createTables();
                console.log("Tables created successfully.");
                console.log("Populating tables with seed...");
                await this.insertData();
                console.log("Tables populated successfully.");
                console.log("Migrations completed.");
            }
            catch (error) {
                console.log("FAILED! Error in migrations...");
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
            finally {
                console.log("Ending connection...");
                BaseDatabase_1.BaseDatabase.connection.destroy();
                console.log("Connection closed graciously.");
            }
        };
        this.createTables = async () => {
            await BaseDatabase_1.BaseDatabase.connection.raw(`

      DROP TABLE IF EXISTS ${ProductDatabase_1.ProductDatabase.TABLE_PACK};
      DROP TABLE IF EXISTS ${ProductDatabase_1.ProductDatabase.TABLE_PRODUCT};
    
      CREATE TABLE IF NOT EXISTS ${ProductDatabase_1.ProductDatabase.TABLE_PRODUCT} (
        code bigint PRIMARY KEY,  
        name varchar(100) NOT NULL, 
        cost_price decimal(9,2) NOT NULL,
        sales_price decimal(9,2) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS ${ProductDatabase_1.ProductDatabase.TABLE_PACK} (
        id bigint AUTO_INCREMENT PRIMARY KEY, 
        pack_id bigint NOT NULL,  
        product_id bigint NOT NULL, 
        qty bigint NOT NULL, 
        CONSTRAINT FOREIGN KEY (pack_id) REFERENCES ${ProductDatabase_1.ProductDatabase.TABLE_PRODUCT}(code),
        CONSTRAINT FOREIGN KEY (product_id) REFERENCES ${ProductDatabase_1.ProductDatabase.TABLE_PRODUCT}(code)
      );

       `);
        };
        this.insertData = async () => {
            await BaseDatabase_1.BaseDatabase.connection(ProductDatabase_1.ProductDatabase.TABLE_PRODUCT).insert(data_1.productsSeed);
            await BaseDatabase_1.BaseDatabase.connection(ProductDatabase_1.ProductDatabase.TABLE_PACK).insert(data_1.packsSeed);
        };
    }
}
const migrations = new Migrations();
migrations.execute();
//# sourceMappingURL=Migrations.js.map