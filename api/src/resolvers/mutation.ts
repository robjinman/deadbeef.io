import { Context } from "../context";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { currentDateString, getUserId, assertAdminUser, lowerCase } from "../utils";
import { verifyCaptcha } from "../captcha";
import { dispatchActivationEmail } from "../account_activation";
import { dispatchEmail } from "../mail";
import { Prisma, Role } from "@prisma/client";

export async function signup(parent: undefined, args: any, context: Context) {
  await verifyCaptcha(args.captcha);

  const email = lowerCase(args.email) || "";

  const exists = await context.prisma.user.count({
    where: { OR: [ { name: args.name }, { email } ] }
  }) > 0;

  if (exists) {
    throw new Error("User with that name or email already exists");
  }

  const code = Math.random().toString(36).substring(2, 10);
  const pwHash = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: {
      name: args.name,
      email: email,
      pwHash: pwHash,
      activationCode: code
    }
  });
  const token = jwt.sign({ userId: user.id }, context.config.appSecret);

  await dispatchActivationEmail(context, user.id, args.name, email, code);

  return {
    token,
    user
  };
}

export async function login(parent: undefined, args: any, context: Context) {
  const email = lowerCase(args.email) || "";
  const user = await context.prisma.user.findUnique({
    where: { email },
    select: { id: true, pwHash: true }
  });

  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.pwHash);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, context.config.appSecret);

  return {
    token,
    user
  };
}

export async function adminLogin(parent: undefined, args: any, context: Context) {
  await verifyCaptcha(args.captcha);

  const email = lowerCase(args.email) || "";
  const user = await context.prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      role: true,
      pwHash: true
    }
  });

  if (!user) {
    throw new Error("No such user found");
  }

  if (user.role !== Role.ADMIN) {
    throw new Error("Not authorised");
  }

  const valid = await bcrypt.compare(args.password, user.pwHash);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, context.config.appSecret);

  return {
    token,
    user
  };
}

export async function sendActivationEmail(parent: undefined, args: any, context: Context) {
  const userId = getUserId(context);

  if (userId === null) {
    throw new Error("No such user");
  }

  const user = await context.prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      activationCode: true,
      name: true,
      email: true
    }
  });

  if (!user) {
    throw new Error("No such user");
  }

  if (user.activationCode === null) {
    throw new Error("User already activated");
  }

  await dispatchActivationEmail(context,
                                user.id,
                                user.name,
                                user.email,
                                user.activationCode);

  return true;
}

export async function activateAccount(parent: undefined, args: any, context: Context) {
  await context.prisma.user.update({
    data: {
      activationCode: null
    },
    where: {
      id: args.id,
      activationCode: args.activationCode
    }
  });

  return true;
}

export async function postArticle(parent: undefined, args: any, context: Context) {
  await assertAdminUser(context);

  const timestamp = currentDateString();

  return await context.prisma.article.create({
    data: {
      draft: true,
      title: args.title,
      summary: args.summary,
      content: args.content,
      tags: { connect: args.tags.map((id: number) => { return { id }; }) },
      modifiedAt: timestamp
    }
  });
}

export async function updateArticle(parent: undefined, args: any, context: Context) {
  await assertAdminUser(context);

  const currentTags = await context.prisma.article.findUnique({ where: { id: args.id } }).tags();
  const currentTagIds = currentTags.map(t => t.id);

  const tagSet = new Set(args.tags);
  const toRemove = currentTagIds.filter(t => !tagSet.has(t));

  return await context.prisma.article.update({
    data: {
      title: args.title,
      summary: args.summary,
      content: args.content,
      tags: {
        disconnect: toRemove.map((id: number) => { return { id }; }),
        connect: args.tags.map((id: number) => { return { id }; })
      },
    },
    where: {
      id: args.id
    }
  });
}

export async function publishArticle(parent: undefined, args: any, context: Context) {
  await assertAdminUser(context);

  const timestamp = currentDateString();

  const data: Prisma.ArticleUpdateInput = {
    draft: !args.publish,
    modifiedAt: timestamp
  };

  if (args.publish) {
    data.publishedAt = timestamp
  };

  return await context.prisma.article.update({
    data,
    where: {
      id: args.id
    }
  });
}

export async function deleteArticle(parent: undefined, args: any, context: Context) {
  await assertAdminUser(context);
  return await context.prisma.article.delete({ where: { id: args.id } });
}

export async function postPage(parent: undefined, args: any, context: Context) {
  await assertAdminUser(context);

  return await context.prisma.page.create({
    data: {
      name: args.name,
      content: args.content
    }
  });
}

export async function postTag(parent: undefined, args: any, context: Context) {
  await assertAdminUser(context);

  return await context.prisma.tag.create({
    data: {
      name: args.name
    }
  });
}

export async function updatePage(parent: undefined, args: any, context: Context) {
  await assertAdminUser(context);

  return await context.prisma.page.update({
    data: {
      content: args.content,
    },
    where: {
      name: args.name
    }
  });
}

export async function deletePage(parent: undefined, args: any, context: Context) {
  await assertAdminUser(context);

  return await context.prisma.page.delete({ where: { name: args.name } });
}

export async function postComment(parent: undefined, args: any, context: Context) {
  await verifyCaptcha(args.captcha);

  const userId = getUserId(context);

  if (userId === null) {
    throw new Error("Not authorised");
  }

  return await context.prisma.comment.create({
    data: {
      content: args.content,
      user: { connect: { id: userId } },
      article: { connect: { id: args.articleId } },
    }
  });
}

export async function deleteComment(parent: undefined, args: any, context: Context) {
  const userId = getUserId(context);

  if (userId === null) {
    throw new Error("Not authorised");
  }

  const user = await context.prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      role: true
    }
  });

  const comment = await context.prisma.comment.findUnique({
    where: { id: args.id },
    select: {
      user: {
        select: {
          id: true
        }
      }
    }
  });

  if (comment) {
    if (!user) {
      throw new Error("Not authorized");
    }
    if (user.role !== Role.ADMIN) {
      if (!comment.user || userId != comment.user.id) {
        throw new Error("Not authorized");
      }
    }

    return await context.prisma.comment.delete({ where: { id: args.id } });
  }
}

export async function uploadFile(parent: undefined, args: any, context: Context) {
  await assertAdminUser(context);

  let file = null;
  const isPage = (await context.prisma.page.count({ where: { id: args.documentId } })) != 0;
  const isArticle = (await context.prisma.article.count({ where: { id: args.documentId } })) != 0;

  if (isPage) {
    file = await context.prisma.file.create({
      data: {
        name: args.name,
        extension: args.extension,
        page: { connect: { id: args.documentId } }
      }
    });
  }
  else  if (isArticle) {
    file = await context.prisma.file.create({
      data: {
        name: args.name,
        extension: args.extension,
        article: { connect: { id: args.documentId } }
      }
    });
  }
  else {
    throw new Error("No such document");
  }

  // TODO: Save the file
  // context.s3Service.upload(file.id, args.data);

  return file;
}

export async function deleteFile(parent: undefined, args: any, context: Context) {
  await assertAdminUser(context);
  return await context.prisma.file.delete({ where: { id: args.id } });
}

export async function updateUser(parent: undefined, args: any, context: Context) {
  const userId = getUserId(context);

  if (userId === null || userId !== args.id) {
    throw new Error("Not authorized");
  }

  const user = await context.prisma.user.findUnique({
    where: { id: userId },
    select: { pwHash: true }
  });

  if (!user) {
    throw new Error("No such user");
  }

  const valid = await bcrypt.compare(args.currentPw, user.pwHash);

  if (!valid) {
    throw new Error("Invalid password");
  }

  const pwHash = await bcrypt.hash(args.newPw, 10);

  return await context.prisma.user.update({
    data: {
      name: args.name,
      email: args.email,
      pwHash: pwHash
    },
    where: {
      id: userId
    }
  });
}

export async function deleteUser(parent: undefined, args: any, context: Context) {
  await assertAdminUser(context);

  const user = await context.prisma.user.findUnique({
    where: { id: args.id },
    select: { activationCode: true }
  });

  if (!user) {
    throw new Error("No such user");
  }

  if (user.activationCode) {
    await context.prisma.comment.deleteMany({
      where: {
        user: {
          id: args.id
        }
      }
    });
  }

  return await context.prisma.user.delete({ where: { id: args.id } });
}

export async function sendEmail(parent: undefined, args: any, context: Context) {
  await verifyCaptcha(args.captcha);

  const appEmail = context.config.emailAddress;
  const appEmailPw = context.config.emailPassword;
  const subject = `(via deadbeef.io) ${args.subject}`;
  const body = `From ${args.email}\n\n${args.message}`;

  const admins = await context.prisma.user.findMany({
    where: { role: Role.ADMIN },
    select: { email: true }
  })

  for (const admin of admins) {
    await dispatchEmail(appEmail, appEmailPw, admin.email, subject, body);
  }

  return true;
}
