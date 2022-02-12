import { User } from "@prisma/client";
import { Context } from "../context";

export async function activated(parent: User, args: any, context: Context) {
  const user = await context.prisma.user.findUnique({
    where: { id: parent.id },
    select: { activationCode: true }
  });
  return user && user.activationCode == null;
}

export async function comments(parent: User, args: any, context: Context) {
  return await context.prisma.user.findUnique({
    where: {
      id: parent.id
    },
    select: {
      comments: true
    },
  }).comments();
}
