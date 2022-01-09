import { PrismaClient } from "@prisma/client";
import { ExpressContext } from "apollo-server-express/src/ApolloServer";

export interface CustomContext extends ExpressContext {
  prisma: PrismaClient,
};
