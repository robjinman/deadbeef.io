import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { schema } from './schema';
import * as query from "./resolvers/query";
import * as Page from "./resolvers/page";
import * as User from "./resolvers/user";
import { ExpressContext } from 'apollo-server-express';
import { Context } from './context';
import { makeConfig } from './config';

const dbUser = process.env["DB_USER"];
const dbPasswordRaw = process.env["DB_PASSWORD_RAW"];
const dbAddr = process.env["DB_ADDR"];
const dbPort = process.env["DB_PORT"];
const dbName = process.env["DB_NAME"];

let dbPassword = process.env["DB_PASSWORD"];
if (!dbPassword) {
  dbPassword = encodeURIComponent(dbPasswordRaw || "");
}

const config = makeConfig();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `postgresql://${dbUser}:${dbPassword}@${dbAddr}:${dbPort}/${dbName}?schema=public`
    }
  }
});

const resolvers = {
  Query: {
    info: () => "This is the API of deadbeef.io",
    ...query
  },

  User,
  Page
};

function makeContext(request: ExpressContext): Context {
  return {
    ...request,
    prisma,
    config
  };
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: makeContext,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
