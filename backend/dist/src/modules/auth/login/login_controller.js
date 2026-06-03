"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const login_service_1 = require("./login_service");
class AuthController {
    constructor(service = new login_service_1.AuthService()) {
        this.service = service;
        this.register = async (req, res) => {
            console.log("📩 register hit");
            const payload = req.body;
            const result = await this.service.registerAsync(payload);
            console.log("📤 result:", result);
            res.status(result.statusCode).json(result);
        };
        this.login = async (req, res) => {
            const payload = req.body;
            const result = await this.service.loginAsync(payload);
            res.status(result.statusCode).json(result);
        };
        this.logout = async (req, res) => {
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({
                    message: "Unauthorized - User ID not found in token",
                    status: "error",
                    statusCode: 401,
                    data: null
                });
                return;
            }
            const result = await this.service.logoutAsync(Number(userId));
            res.status(result.statusCode).json(result);
        };
    }
}
exports.AuthController = AuthController;
