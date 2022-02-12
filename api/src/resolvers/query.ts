import { Prisma, Role } from "@prisma/client";
import { Context } from "../context";
import { assertAdminUser, getUserId } from "../utils";

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

export async function publishedArticles(parent: any, args: any, context: Context) {
  const where: Prisma.ArticleWhereInput = {
    draft: false
  };

  if (args.tags) {
    where.tags = {
      some: {
        id: {
          in: args.tags
        }
      }
    };
  }

  return await context.prisma.article.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    skip: args.skip,
    take: args.takes
  });
}

export async function allArticles(parent: any, args: any, context: Context) {
  await assertAdminUser(context);

  return await context.prisma.article.findMany({
    skip: args.skip,
    take: args.first,
    orderBy:  {
      createdAt: "desc"
    }
  });
}

export async function article(parent: any, args: any, context: Context) {
  const article = await context.prisma.article.findUnique({ where: { id: args.id } });

  if (article && article.draft) {
    await assertAdminUser(context);
  }

  return article;
}

export async function tag(parent: any, args: any, context: Context) {
  return await context.prisma.tag.findUnique({ where: { id: args.id } });
}

export async function usedTags(parent: any, args: any, context: Context) {
  return await context.prisma.tag.findMany({
    where: {
      articles: {
        some: {
          draft: false
        }
      }
    }
  });
}

export async function allTags(parent: any, args: any, context: Context) {
  return await context.prisma.tag.findMany();
}

export async function comments(parent: any, args: any, context: Context) {
  await assertAdminUser(context);

  return await context.prisma.comment.findMany({
    skip: args.skip,
    take: args.take,
    orderBy: {
      createdAt: "desc"
    }
  });
}

export async function files(parent: any, args: any, context: Context) {
  await assertAdminUser(context);

  return await context.prisma.file.findMany({
    where: {
      OR: [
        {
          page: {
            id: args.documentId
          },
        },
        {
          article: {
            id: args.documentId
          }
        }
      ]
    }
  });
}

export async function users(parent: any, args: any, context: Context) {
  await assertAdminUser(context);

  return await context.prisma.user.findMany({
    skip: args.skip,
    take: args.take
  });
}

export async function user(parent: any, args: any, context: Context) {
  const userId = getUserId(context);
  const user = await context.prisma.user.findUnique({ where: { id: userId } });

  if (user && user.role != Role.ADMIN && user.name != args.name) {
    throw new Error("Not authorized");
  }

  return user;
}
