import { Role } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { Context } from './context';

export interface AuthPayload {
  userId: number;
}

export function currentDateString() {
  return (new Date()).toISOString();
}

export function getUserId(context: Context): number|null {
  const authorization = context.req.get('Authorization');
  if (authorization) {
    const token = authorization.replace('Bearer ', '');

    if (token) {
      const { userId } = <AuthPayload>jwt.verify(token, context.config.appSecret);
      return userId;
    }
  }

  return null;
}

export async function assertAdminUser(context: Context) {
  const userId = getUserId(context);
  if (userId === null) {
    throw new Error("Not authorized");
  }

  const user = await context.prisma.user.findUnique({
    where: { id: userId },
    select: { role: true }
  });

  if (user == null || user.role !== Role.ADMIN) {
    throw new Error("Not authorized");
  }
}

export function lowerCase(s?: string|null) {
  return s ? s.toLowerCase() : null;
}
