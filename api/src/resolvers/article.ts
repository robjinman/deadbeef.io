import { Article, Prisma } from "@prisma/client";
import { Context } from "../context";
import { getUserId } from "../utils";

export function comments(parent: Article, args: any, context: Context) {
  const userId = getUserId(context);

  const whereClauses: Prisma.CommentWhereInput[] = [
    { user: { activationCode: null } },
    { user: null }
  ];

  if (userId !== null) {
    whereClauses.push({ user: { id: userId } });
  }

  return context.prisma.article.findUnique({ where: { id: parent.id } }).comments(
    {
      orderBy: { createdAt: "desc" },
      where: { OR: whereClauses }
    }
  );
}

export function files(parent: Article, args: any, context: Context) {
  return context.prisma.article.findUnique({ where: { id: parent.id } }).files();
}

export function tags(parent: Article, args: any, context: Context) {
  return context.prisma.article.findUnique({ where: { id: parent.id } }).tags();
}
