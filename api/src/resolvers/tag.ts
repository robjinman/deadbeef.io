import { Tag } from "@prisma/client";
import { Context } from "../context";

export function articles(parent: Tag, args: any, context: Context) {
  return context.prisma.tag.findUnique({ where: { id: parent.id } }).articles();
}
