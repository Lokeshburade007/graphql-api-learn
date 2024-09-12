import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import { schema } from "./schema/index.js"; // Import schema
import cors from 'cors';


const app = express();


const corsOptions = {
  origin: 'http://localhost:3000', // Only allow requests from this origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));


// Create and use the GraphQL handler.
app.all("/graphql", createHandler({ schema }));

// Serve the GraphiQL IDE using Ruru.
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" })); // Serve GraphiQL at root
});

// Start the server at port 4000
app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});

