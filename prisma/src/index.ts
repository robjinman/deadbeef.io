import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { schema } from './schema';
import * as query from "./query";
import * as User from "./user";
import * as Post from "./post";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    info: () => "This is the API of deadbeef.io",
    ...query
  },

  User,
  Post,
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: request => {
    return {
      ...request,
      prisma,
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
