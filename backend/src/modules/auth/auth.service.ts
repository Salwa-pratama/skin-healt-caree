import { Injectable, BadRequestException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { hashPassword, sanitizeUser, verifyPassword } from '../../utils/password_util';
import { generateTokens } from '../../utils/token_utils';

@Injectable()
export class AuthService {
  constructor(private repository: AuthRepository) {}

  async registerAsync(payload: RegisterDto) {
    try {
      const existing = await this.repository.findByEmailAsync(payload.email);
      if (existing) {
        throw new BadRequestException("Email already in use");
      }

      const newUser = await this.repository.createUserAsync({
        email: payload.email,
        name: payload.name,
        passwordHash: hashPassword(payload.password),
        role: "user",
        refreshTokenHash: null,
      });

      return {
        message: "User registered successfully",
        status: "success",
        statusCode: 201,
        data: sanitizeUser(newUser),
      };
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException("An error occurred while registering.");
    }
  }

  async loginAsync(payload: LoginDto) {
    try {
      const user = await this.repository.findByEmailAsync(payload.email);
      if (!user || !verifyPassword(payload.password, user.passwordHash)) {
        throw new UnauthorizedException("Invalid email or password");
      }

      const { accessToken, refreshToken } = generateTokens(user.id, user.email, user.role);
      await this.repository.updateRefreshTokenAsync(user.id, hashPassword(refreshToken));

      let redirect_to = "/";
      switch (user.role) {
        case "user": redirect_to = "/pages/dashboard/user"; break;
        case "admin": redirect_to = "/pages/dashboard/admin"; break;
      }

      return {
        message: "Login successful",
        status: "success",
        statusCode: 200,
        data: {
          user: sanitizeUser(user),
          accessToken,
          refreshToken,
          redirect_to,
        }
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new InternalServerErrorException("An error occurred while logging in.");
    }
  }

  async logoutAsync(userId: number) {
    try {
      await this.repository.clearRefreshTokenAsync(userId);
      return {
        message: "Logout successful",
        status: "success",
        statusCode: 200,
        data: null
      };
    } catch (error) {
      throw new InternalServerErrorException("An error occurred while logging out.");
    }
  }
}
