import { Context } from "../context";

export async function comments(parent: any, args: any, context: Context) {
  return await context.prisma.user.findUnique({
    where: {
      id: parent.id
    },
    select: {
      comments: true
    },
  }).comments();
}
