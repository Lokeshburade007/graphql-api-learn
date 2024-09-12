import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } from "graphql";
import axios from "axios";
import { TodosType } from '../todos/todos.resolver.js';

// Define the external resolver function for `todo`
export const todoResolve = async (parent) => {
  const url = `https://jsonplaceholder.typicode.com/todos/${parent.id}`;
  const res = await axios.get(url);
  return res.data;
};

// Define the UserType
export const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    address: {
      type: new GraphQLObjectType({
        name: "Address",
        fields: {
          street: { type: GraphQLString },
          suite: { type: GraphQLString },
          city: { type: GraphQLString },
          zipcode: { type: GraphQLString },
          geo: {
            type: new GraphQLObjectType({
              name: "Geo",
              fields: {
                lat: { type: GraphQLString },
                lng: { type: GraphQLString },
              },
            }),
          },
        },
      }),
    },
    todo: {
      type: TodosType,
      resolve: todoResolve, // Call the external resolver
    },
  },
});

// Export UserQuery object
export const UserQuery = {
  getUserById: {
    type: UserType,
    args: {
      id: { type: GraphQLID },
    },
    resolve: async (_, args) => {
      const url = `https://jsonplaceholder.typicode.com/users/${args.id}`;
      const res = await axios.get(url);
      return res.data;
    },
  },
  getAllUsers: {
    type: new GraphQLList(UserType), // Return a list of UserType
    resolve: async () => {
      const url = `https://jsonplaceholder.typicode.com/users/`;
      const res = await axios.get(url);
      return res.data; // Return the array of users
    },
  },
};



// Export UserQuery object
// export const UserQuery = {
//   // getUserById: {
//   //   type: UserType,
//   //   args: {
//   //     id: { type: GraphQLID },
//   //   },
//   //   resolve: (_, args) => {
//   //     const url = `https://jsonplaceholder.typicode.com/users/${args.id}`;
//   //     return axios.get(url).then((res) => {
//   //       return res.data;
//   //     }
//   //     );
//   //   },
//   // },
//   getAllUsers: {
//     type: UserType,
//     resolve: () => {
//       const url = `https://jsonplaceholder.typicode.com/users/`;
//       return axios.get(url).then((res) => {
//         // console.log(res.data);
//         return res.data;
//       }
//       );
//     },
//   },
// };
