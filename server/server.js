//package imports
const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const path = require("path");


//DB connection
const db = require("./config/connection");

//Internal Module Imports
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

// //express initialization and PORT settings
// const app = express();
const PORT = process.env.PORT || 3001;

//set up Apollo Server as a new Class


async function startApolloServer(typeDefs, resolvers) {
    // Same ApolloServer initialization as before
    const server = new ApolloServer({ typeDefs, resolvers, context: authMiddleware, });
  
    // Required logic for integrating with Express
    await server.start();
  
    const app = express();
  
    server.applyMiddleware({
       app,
  
       // By default, apollo-server hosts its GraphQL endpoint at the
       // server root. However, *other* Apollo Server packages host it at
       // /graphql. Optionally provide this to match apollo-server.
       path: '/'
    });
  
    //check for production status, if in production serve client/build as static assets
    if (process.env.NODE_ENV === "production") {
        app.use(express.static.apply(path.join(__dirname, "../client/build")));
    };

    //display base webpage from build
    app.get("*", (req, res) => {
     res.sendFile(path.join(__dirname, 'build','index.html'));
    });
    // Modified server startup
    await new Promise(resolve => app.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  }

/* const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
}); */
/* 
//apply middleware
server.applyMiddleware( { app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); */





//Start server and GraphQL (in theory, I'm a little shaky on GraphQL)

db.once("open", () => {
  app.listen(PORT, () => {
      console.log(`API server running on port http://localhost:${PORT}`);
      console.log(`Use GraphQL...theoretically at http://localhost:${PORT}${server.graphqlPath}`);
  })
})


