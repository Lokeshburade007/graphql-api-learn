import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLList } from "graphql";
import axios from "axios";

// Define TodosType
export const TodosType = new GraphQLObjectType({
    name: "TodosType",
    fields: {
        userId: { type: GraphQLID },
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        completed: { type: GraphQLBoolean },
    },
});

// Export TodosQuery object
export const TodosQuery = {
    getTodosById: {
        type: TodosType,
        args: {
            id: { type: GraphQLID },
        },
        resolve: (_, args) => {
            const url = `https://jsonplaceholder.typicode.com/todos/${args.id}`;
            return axios.get(url).then((res) => {
                return res.data;
            }
            );
        },
    },
    getAllTodos: {
        type: new GraphQLList(TodosType),
        resolve: async () => {
            const url = `https://jsonplaceholder.typicode.com/todos/`;
            const res = await axios.get(url);
            return res.data; // Return the array of todos
        },
    },
};



// Export UserQuery object
// export const TodosQuery = {
// //   getTodosById: {
// //     type: TodosType,
// //     args: {
// //       id: { type: GraphQLID },
// //     },
// //     resolve: (_, args) => {
// //       const url = `https://jsonplaceholder.typicode.com/todos/${args.id}`;
// //       return axios.get(url).then((res) => {
// //         return res.data;
// //       }
// //       );
// //     },
// //   },
//   getAllTodos: {
//     type: TodosType,
//     resolve: async () => {
//       const url = `https://jsonplaceholder.typicode.com/todos/`;
//       const res = await axios.get(url);
//         console.log(res.data);
//         return res.data;
//     },
//   },
// };

