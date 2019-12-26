const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLList
} = require("graphql");

//dummy data
const users = [
  { id: 1, name: "James Hetfield", email: "james@metallica.com", age: 45 },
  { id: 2, name: "Lars Ulrich", email: "lars.ulrich@metallica.com", age: 50 },
  { id: 3, name: "Kirk Hammet", email: "kirk.hammer@metallica.com", age: 46 }
];

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
        for (let i = 0; i < users.length; i++) {
          if (users[i].id == args.id) {
            return users[i];
          }
        }
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return users;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
