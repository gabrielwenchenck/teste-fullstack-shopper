"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationError = void 0;
const BaseError_1 = require("./BaseError");
class AuthorizationError extends BaseError_1.BaseError {
    constructor(message = "Permissão insuficiente") {
        super(403, message);
    }
}
exports.AuthorizationError = AuthorizationError;
//# sourceMappingURL=AuthorizationError.js.map