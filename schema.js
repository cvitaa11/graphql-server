const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLList
} = require("graphql");

//UserType
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

//RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        return axios
          .get("http://localhost:3000/users/" + args.id)
          .then(Response => Response.data);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return axios
          .get("http://localhost:3000/users")
          .then(Response => Response.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
