import getActiveRoute from "./getActiveRoute";

const ROUTES = {
  HOME: "/users",
  LIST: "/users/list",
  DETAIL: "/users/detail/:userId"
};

describe("getRouteWithParameters", () => {
  it("should return a route", () => {
    expect(getActiveRoute(ROUTES, "/users/detail/1")).toEqual(ROUTES.DETAIL);
  });
  it("should return undefined", () => {
    expect(getActiveRoute(ROUTES, "users/groups")).toEqual(undefined);
    expect(getActiveRoute(ROUTES, "users/groups/:groupId")).toEqual(undefined);
  });
});
