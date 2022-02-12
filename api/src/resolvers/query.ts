import { Prisma, Role } from "@prisma/client";
import { Context } from "../context";
import { assertAdminUser, getUserId } from "../utils";

export async function page(parent: undefined, args: any, context: Context) {
  return await context.prisma.page.findUnique({
    where: {
      id: args.id
    }
  });
}

export async function pages(parent: undefined, args: any, context: Context) {
  return await context.prisma.page.findMany();
}

export async function publishedArticles(parent: undefined, args: any, context: Context) {
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

export async function allArticles(parent: undefined, args: any, context: Context) {
  await assertAdminUser(context);

  return await context.prisma.article.findMany({
    skip: args.skip,
    take: args.first,
    orderBy:  {
      createdAt: "desc"
    }
  });
}

export async function article(parent: undefined, args: any, context: Context) {
  const article = await context.prisma.article.findUnique({ where: { id: args.id } });

  if (article && article.draft) {
    await assertAdminUser(context);
  }

  return article;
}

export async function tag(parent: undefined, args: any, context: Context) {
  return await context.prisma.tag.findUnique({ where: { id: args.id } });
}

export async function usedTags(parent: undefined, args: any, context: Context) {
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

export async function allTags(parent: undefined, args: any, context: Context) {
  return await context.prisma.tag.findMany();
}

export async function comments(parent: undefined, args: any, context: Context) {
  await assertAdminUser(context);

  return await context.prisma.comment.findMany({
    skip: args.skip,
    take: args.take,
    orderBy: {
      createdAt: "desc"
    }
  });
}

export async function files(parent: undefined, args: any, context: Context) {
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

export async function users(parent: undefined, args: any, context: Context) {
  await assertAdminUser(context);

  return await context.prisma.user.findMany({
    skip: args.skip,
    take: args.take
  });
}

export async function user(parent: undefined, args: any, context: Context) {
  const userId = getUserId(context);
  if (userId === null) {
    throw new Error("Not authorised");
  }
  const loggedInUser = await context.prisma.user.findUnique({ where: { id: userId } });

  if (!loggedInUser) {
    throw new Error("Not authorised");
  }

  if (loggedInUser.role != Role.ADMIN && loggedInUser.name != args.name) {
    throw new Error("Not authorized");
  }

  return user;
}
