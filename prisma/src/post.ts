import { CustomContext } from "./types";

export function author(parent: any, args: any, context: CustomContext) {
  return context.prisma.post.findUnique({
    where: {
      id: parent.id
    },
    select: {
      author: true
    },
  }).author();
}
