const { GraphQLServer } = require('graphql-yoga');

const users = [
  {
    id: '1',
    name: 'Lukas PROUST',
    email: 'lukas.proust@gmail.com',
    description: 'Fullstack tutorial for GraphQL',
    createdAt: new Date('2018-01-01'),
    updatedAt: new Date('2018-01-02'),
  },
];

// 2
let idCount = users.length;
const resolvers = {
  Query: {
    info: () => `This is the API to testing front-env`,
    users: () => users,
  },
  Mutation: {
    // 2
    post: (parent, { email, name, description }) => {
      idCount += 1;
      const user = {
        id: `${idCount}`,
        name,
        email,
        description: description || '',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(user);
      return user;
    },
    update: (parent, { id, name, email, description }) => {
      const userToUpdateIndex = users.findIndex(user => user.id === id);
      if (userToUpdateIndex !== -1) {
        users[userToUpdateIndex] = {
          ...users[userToUpdateIndex],
          description,
          name,
          email,
          updatedAt: new Date(),
        };
        return users[userToUpdateIndex];
      }
      return undefined;
    },
    delete: (parent, { id }) => {
      const userToDeleteIndex = users.findIndex(user => user.id === id);
      users.splice(userToDeleteIndex, 1);
    },
  },
};

// 3
const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
