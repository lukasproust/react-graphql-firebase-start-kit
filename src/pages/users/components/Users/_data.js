let id = 0;
function createData(name, email, group, creation, updated) {
  id += 1;
  return { id, name, email, group, creation, updated };
}

export default [
  createData(
    "Lukas PROUST",
    "lukas.proust@gmail.com",
    "admin",
    "2018-12-10",
    "2018-12-10"
  ),
  createData(
    "John Doe",
    "john.doe@gmail.com",
    "user",
    "2018-12-10",
    "2018-12-10"
  )
];
