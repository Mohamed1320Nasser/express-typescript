import { User } from '@prisma/client';
declare global {
  namespace Express {
    interface CustomRequest {
      user?: number | User;
      role?: string;
    }
  }
}
