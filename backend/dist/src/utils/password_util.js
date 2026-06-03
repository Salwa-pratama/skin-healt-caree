"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeUser = sanitizeUser;
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
function sanitizeUser(user) {
    const { passwordHash, refreshToken, ...publicUser } = user;
    return publicUser;
}
function hashPassword(password) {
    return bcryptjs_1.default.hashSync(password, bcryptjs_1.default.genSaltSync(10));
}
function verifyPassword(password, hash) {
    return bcryptjs_1.default.compareSync(password, hash);
}
