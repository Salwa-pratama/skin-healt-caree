"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const service_1 = require("./service");
const dto_1 = require("./dto");
const http_status_codes_1 = require("http-status-codes");
class ProfileController {
    constructor() {
        this.getMe = async (req, res) => {
            try {
                const userId = req.user?.id || req.user?.userId;
                if (!userId) {
                    return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                        status: "error",
                        message: "Unauthorized"
                    });
                }
                const profile = await this.service.getProfile(Number(userId));
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    message: "Profile fetched successfully",
                    data: profile,
                });
            }
            catch (error) {
                return res.status(error.status || 500).json({
                    status: "error",
                    message: error.message
                });
            }
        };
        this.updateMe = async (req, res) => {
            try {
                const userId = req.user?.id || req.user?.userId;
                if (!userId) {
                    return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                        status: "error",
                        message: "Unauthorized"
                    });
                }
                const validatedData = dto_1.updateProfileSchema.parse(req.body);
                const fileBuffer = req.file?.buffer;
                const updatedProfile = await this.service.updateProfile(Number(userId), validatedData, fileBuffer);
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    status: "success",
                    message: "Profile updated successfully",
                    data: updatedProfile,
                });
            }
            catch (error) {
                return res.status(error.status || 400).json({
                    status: "error",
                    message: error.message || "Update failed"
                });
            }
        };
        this.service = new service_1.ProfileService();
    }
}
exports.ProfileController = ProfileController;
