"use strict";
// api/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../src/app"));
const serverless_http_1 = __importDefault(require("serverless-http"));
console.log("🚀 Initializing Vercel serverless function...");
exports.default = (0, serverless_http_1.default)(app_1.default);
console.log("✅ Serverless function ready!");
