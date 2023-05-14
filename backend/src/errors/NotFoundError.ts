import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  constructor(message: string = "Produto não encontrado") {
    super(404, message);
  }
}
