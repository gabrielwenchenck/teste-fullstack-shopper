"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableError = void 0;
const BaseError_1 = require("./BaseError");
class UnprocessableError extends BaseError_1.BaseError {
    constructor(message = "Parâmetros válidos, porém com erros de semântica") {
        super(422, message);
    }
}
exports.UnprocessableError = UnprocessableError;
//# sourceMappingURL=UnprocessableError.js.map