"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = void 0;
const BaseError_1 = require("./BaseError");
class AuthenticationError extends BaseError_1.BaseError {
    constructor(message = "Credenciais inválidas") {
        super(401, message);
    }
}
exports.AuthenticationError = AuthenticationError;
//# sourceMappingURL=AuthenticationError.js.map