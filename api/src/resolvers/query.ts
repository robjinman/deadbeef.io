import { Context } from "../context";

export async function page(parent: any, args: any, context: Context) {
  return await context.prisma.page.findUnique({
    where: {
      id: parent.id
    }
  });
}

export async function pages(parent: any, args: any, context: Context) {
  return await context.prisma.page.findMany();
}
