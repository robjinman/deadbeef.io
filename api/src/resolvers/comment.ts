import { Comment } from "@prisma/client";
import { Context } from "../context";

export async function user(parent: Comment, args: any, context: Context) {
  return await context.prisma.comment.findUnique({ where: { id: parent.id } }).user();
}

export async function article(parent: Comment, args: any, context: Context) {
  return await context.prisma.comment.findUnique({ where: { id: parent.id } }).article();
}
