import { Request, Response } from "express";
import { ProfileService } from "./service";
import { updateProfileSchema } from "./dto";
import { StatusCodes } from "http-status-codes";

export class ProfileController {
  private service: ProfileService;

  constructor() {
    this.service = new ProfileService();
  }

  getMe = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id || (req as any).user?.userId;
      if (!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ 
          status: "error", 
          message: "Unauthorized" 
        });
      }

      const profile = await this.service.getProfile(Number(userId));
      return res.status(StatusCodes.OK).json({
        status: "success",
        message: "Profile fetched successfully",
        data: profile,
      });
    } catch (error: any) {
      return res.status(error.status || 500).json({ 
        status: "error", 
        message: error.message 
      });
    }
  };

  updateMe = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user?.id || (req as any).user?.userId;
      if (!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ 
          status: "error", 
          message: "Unauthorized" 
        });
      }

      const validatedData = updateProfileSchema.parse(req.body);
      const updatedProfile = await this.service.updateProfile(Number(userId), validatedData);
      
      return res.status(StatusCodes.OK).json({
        status: "success",
        message: "Profile updated successfully",
        data: updatedProfile,
      });
    } catch (error: any) {
      return res.status(error.status || 400).json({ 
        status: "error", 
        message: error.message || "Update failed" 
      });
    }
  };
}
