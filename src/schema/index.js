import { GraphQLSchema } from "graphql";
import { RootQuery } from "./queries.js";

// Create and export GraphQL schema
export const schema = new GraphQLSchema({
  query: RootQuery,
});
