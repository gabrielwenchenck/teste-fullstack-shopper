import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { productRouter } from "./router/productRouter";
import fileUpload from "express-fileupload";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.use("/product", productRouter);

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`);
});
