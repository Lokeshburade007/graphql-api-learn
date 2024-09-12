import { GraphQLObjectType } from "graphql";
import { UserQuery } from "./user/user.resolver.js";
import { TodosQuery } from "./todos/todos.resolver.js";

export const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    ...UserQuery,  // Include user-related queries
    ...TodosQuery, // Include todos-related queries
  },
});

