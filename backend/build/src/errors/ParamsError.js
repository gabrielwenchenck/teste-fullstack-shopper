"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamsError = void 0;
const BaseError_1 = require("./BaseError");
class ParamsError extends BaseError_1.BaseError {
    constructor(message = "Parâmetros inválidos ou faltando") {
        super(400, message);
    }
}
exports.ParamsError = ParamsError;
//# sourceMappingURL=ParamsError.js.map