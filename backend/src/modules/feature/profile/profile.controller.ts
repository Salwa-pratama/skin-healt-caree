import { Controller, Get, Put, Body, UseGuards, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { User } from '../../../common/decorators/user.decorator';

@ApiTags('Profile')
@Controller('feature/profile')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Mendapatkan profil saya' })
  async getMe(@User() user: any) {
    const profile = await this.service.getProfile(Number(user.userId));
    return { status: "success", message: "Profile fetched successfully", data: profile };
  }

  @Put()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update profil saya' })
  async updateMe(@UploadedFile() file: Express.Multer.File, @Body() body: any, @User() user: any) {
    try {
      const updatedProfile = await this.service.updateProfile(Number(user.userId), body, file?.buffer);
      return { status: "success", message: "Profile updated successfully", data: updatedProfile };
    } catch (error: any) {
      throw new BadRequestException(error.message || "Update failed");
    }
  }
}
