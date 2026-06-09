import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password min 8 characters"),
});
export class LoginDto extends createZodDto(LoginSchema) {}

export const RegisterSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password min 8 characters"),
  name: z.string().min(1, "Name required"),
});
export class RegisterDto extends createZodDto(RegisterSchema) {}

export interface UserResponse {
  id: number;
  email: string;
  name: string | null;
  role: string;
  phone: string | null;
  skintype: string | null;
  createdAt: Date;
  updatedAt: Date;
}
