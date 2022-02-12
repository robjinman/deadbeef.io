import { Context } from "../context";

export async function files(parent: any, args: any, context: Context) {
  return await context.prisma.page.findUnique({
    where: {
      id: parent.id
    },
    select: {
      files: true
    },
  }).files();
}
