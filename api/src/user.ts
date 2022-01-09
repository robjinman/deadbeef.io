export function posts(parent: any, args: any, context: any) {
  return context.prisma.user.findUnique({
    where: {
      id: parent.id
    },
    select: {
      posts: true
    },
  }).posts();
}
