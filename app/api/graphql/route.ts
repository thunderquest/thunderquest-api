import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import path from "node:path";
import { gql } from "graphql-tag";
import { readFileSync, existsSync } from "node:fs";
import { resolvers } from "./resolvers";

const schemaFilePath = path.resolve(process.cwd(), './src/schema.graphql');

if (!existsSync(schemaFilePath)) {
    console.error(`The required GraphQL schema file was not found at ${schemaFilePath}`);
    process.exit(1);
}

const typeDefs = gql(readFileSync(schemaFilePath, 'utf-8'));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    plugins: [
    ],
});

// TODO this might cause an issue later.
// @ts-ignore
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => ({ req }),
});

export { handler as GET, handler as POST };