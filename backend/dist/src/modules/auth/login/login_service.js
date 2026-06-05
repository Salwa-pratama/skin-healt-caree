"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const http_status_codes_1 = require("http-status-codes");
const login_repository_1 = require("./login_repository");
const service_response_1 = require("../../../common/models/service_response");
const password_util_1 = require("../../../utils/password_util");
const token_utils_1 = require("../../../utils/token_utils");
class AuthService {
    constructor(repository = new login_repository_1.AuthRepository()) {
        this.repository = repository;
    }
    async registerAsync(payload) {
        try {
            const existing = await this.repository.findByEmailAsync(payload.email);
            if (existing) {
                return service_response_1.ServiceResponse.success("Email already in use", null, http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
            const newUser = await this.repository.createUserAsync({
                email: payload.email,
                name: payload.name,
                passwordHash: (0, password_util_1.hashPassword)(payload.password),
                role: "USER",
                refreshTokenHash: null,
            });
            return service_response_1.ServiceResponse.success("User registered successfully", (0, password_util_1.sanitizeUser)(newUser), http_status_codes_1.StatusCodes.CREATED);
        }
        catch (error) {
            return service_response_1.ServiceResponse.failure("An error occurred while registering.", null, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
    async loginAsync(payload) {
        try {
            const user = await this.repository.findByEmailAsync(payload.email);
            if (!user || !(0, password_util_1.verifyPassword)(payload.password, user.passwordHash)) {
                return service_response_1.ServiceResponse.failure("Invalid email or password", null, http_status_codes_1.StatusCodes.UNAUTHORIZED);
            }
            const { accessToken, refreshToken } = (0, token_utils_1.generateTokens)(user.id, user.email, user.role);
            await this.repository.updateRefreshTokenAsync(user.id, (0, password_util_1.hashPassword)(refreshToken));
            return service_response_1.ServiceResponse.success("Login successful", {
                user: (0, password_util_1.sanitizeUser)(user),
                accessToken,
                refreshToken,
            });
        }
        catch (error) {
            console.log("error : ", error);
            return service_response_1.ServiceResponse.failure(`An error occurred while logging in. Error : ${error}`, null, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
    async logoutAsync(userId) {
        try {
            await this.repository.clearRefreshTokenAsync(userId);
            return service_response_1.ServiceResponse.success("Logout successful", null);
        }
        catch (error) {
            return service_response_1.ServiceResponse.failure("An error occurred while logging out.", null, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.AuthService = AuthService;
