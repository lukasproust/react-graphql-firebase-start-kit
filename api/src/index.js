const { GraphQLServer } = require('graphql-yoga');

const links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
];

// 2
let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {
    // 2
    post: (parent, args) => {
      idCount += 1;
      const link = {
        id: `link-${idCount}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    update: (parent, args) => {
      const linkToUpdateIndex = links.findIndex(link => link.id === args.id);
      if (linkToUpdateIndex !== -1) {
        links[linkToUpdateIndex] = {
          ...links[linkToUpdateIndex],
          description: args.description,
          url: args.url,
        };
        return links[linkToUpdateIndex];
      }
      return undefined;
    },
    delete: (parent, args) => {
      const linkToDeleteIndex = links.findIndex(link => link.id === args.id);
      links.splice(linkToDeleteIndex, 1);
    },
  },
};

// 3
const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
