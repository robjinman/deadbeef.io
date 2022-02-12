import { Article, File, Page } from "@prisma/client";
import { Context } from "../context";

export async function document(parent: File,
                               args: any,
                               context: Context): Promise<Article|Page|null> {
  const file = context.prisma.file.findUnique({ where: { id: parent.id } });
  const article = await file.article();
  if (article) {
    return article;
  }
  return await file.page();
}
