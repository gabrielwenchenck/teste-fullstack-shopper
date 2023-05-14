import { ProductDatabase } from "./../ProductDatabase";
import { packsSeed, productsSeed } from "./data";
import { BaseDatabase } from "../BaseDatabase";

class Migrations extends BaseDatabase {
  execute = async () => {
    try {
      console.log("Creating tables...");
      await this.createTables();
      console.log("Tables created successfully.");

      console.log("Populating tables with seed...");
      await this.insertData();
      console.log("Tables populated successfully.");

      console.log("Migrations completed.");
    } catch (error) {
      console.log("FAILED! Error in migrations...");
      if (error instanceof Error) {
        console.log(error.message);
      }
    } finally {
      console.log("Ending connection...");
      BaseDatabase.connection.destroy();
      console.log("Connection closed graciously.");
    }
  };

  createTables = async () => {
    await BaseDatabase.connection.raw(`

      DROP TABLE IF EXISTS ${ProductDatabase.TABLE_PACK};
      DROP TABLE IF EXISTS ${ProductDatabase.TABLE_PRODUCT};
    
      CREATE TABLE IF NOT EXISTS ${ProductDatabase.TABLE_PRODUCT} (
        code bigint PRIMARY KEY,  
        name varchar(100) NOT NULL, 
        cost_price decimal(9,2) NOT NULL,
        sales_price decimal(9,2) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS ${ProductDatabase.TABLE_PACK} (
        id bigint AUTO_INCREMENT PRIMARY KEY, 
        pack_id bigint NOT NULL,  
        product_id bigint NOT NULL, 
        qty bigint NOT NULL, 
        CONSTRAINT FOREIGN KEY (pack_id) REFERENCES ${ProductDatabase.TABLE_PRODUCT}(code),
        CONSTRAINT FOREIGN KEY (product_id) REFERENCES ${ProductDatabase.TABLE_PRODUCT}(code)
      );

       `);
  };

  insertData = async () => {
    await BaseDatabase.connection(ProductDatabase.TABLE_PRODUCT).insert(
      productsSeed
    );
    await BaseDatabase.connection(ProductDatabase.TABLE_PACK).insert(packsSeed);
  };
}

const migrations = new Migrations();
migrations.execute();
