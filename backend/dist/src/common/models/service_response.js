"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceResponse = void 0;
const http_status_codes_1 = require("http-status-codes");
class ServiceResponse {
    static success(message, data, statusCode = http_status_codes_1.StatusCodes.OK) {
        return { message, status: "success", statusCode, data };
    }
    static failure(message, data, statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR) {
        return { message, status: "error", statusCode, data };
    }
}
exports.ServiceResponse = ServiceResponse;
