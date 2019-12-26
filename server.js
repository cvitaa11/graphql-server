const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("./schema.js");

const app = express();

app.use(
  "/graphql",
  expressGraphQL({
    schema: schema,
    graphiql: true
  })
);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
