import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt } from "graphql";

// Define ProductType
const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
  },
});

// Export ProductQuery object
export const ProductQuery = {
  getProduct: {
    type: ProductType,
    resolve: () => {
      return {
        id: 200,
        name: "Samsung s1 Ultra pro",
        price: 150000,
      };
    },
  },
};
