const { GraphQLServer } = require("graphql-yoga");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
  {
    id: "link-1",
    url: "www.howtographql1.com",
    description: "Fullstack tutorial for GraphQLL",
  },
  {
    id: "link-2",
    url: "www.howtographql2222.com",
    description: "Fullstack tutorial for GraphQLLLLL",
  },
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    // 2
    feed: () => links,
    link: (parent, args) => links[args.id],
  },
  Mutation: {
    // 2
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const link = {
        id: `link-${args.id}`,
        url: args.url ? args.url : links[args.id].url,
        description: args.description
          ? args.description
          : links[args.id].description,
      };
      links[args.id] = link;
      return link;
    },
    deleteLink: (parent, args) => {
      if (links[args.id]) {
        links.splice(args.id, 1);
        return links;
      } else {
        const error = Error(`link with id: ${args.id} doesn't exist!`);
        Error.captureStackTrace(error, this.get);
        throw error;
      }
    },
  },
};

// 3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
