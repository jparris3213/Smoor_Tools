//package imports
const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");

//DB connection
const db = require("./config/connection");

//Internal Module Imports
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

//express initialization and PORT settings
const app = express();
const PORT = process.env.PORT || 3001;

//set up Apollo Server as a new Class

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

//apply middleware
server.applyMiddleware( { app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//check for production status, if in production serve client/build as static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static.apply(path.join(__dirname, "../client/build")));
};

//display base webpage from build
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'build','index.html'));
  });