import { CustomContext } from "./types";

export async function users(root: any, args: any, context: CustomContext, info: any) {
  return await context.prisma.user.findMany();
}

export async function user(root: any, args: any, context: CustomContext, info: any) {
  return await context.prisma.user.findFirst({
    where: {
      name: args.name
    }
  });
}

export async function posts(root: any, args: any, context: CustomContext, info: any) {
  return await context.prisma.post.findMany();
}
