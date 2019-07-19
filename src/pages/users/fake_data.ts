import { User } from "./types";

let id = 0;

type CreateUser = (user: Omit<User, "id">) => User;

const createUser: CreateUser = ({
  name,
  email,
  group,
  createdAt,
  updatedAt
}) => {
  id += 1;
  return { id: id.toString(), name, email, group, createdAt, updatedAt };
};

export default [
  createUser({
    name: "Lukas PROUST",
    email: "lukas.proust@gmail.com",
    group: "admin",
    createdAt: "2018-12-10",
    updatedAt: "2018-12-10"
  }),
  createUser({
    name: "John Doe",
    email: "john.doe@gmail.com",
    group: "user",
    createdAt: "2018-12-10",
    updatedAt: "2018-12-10"
  })
];
