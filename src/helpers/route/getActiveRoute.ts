import { matchPath } from "react-router-dom";

const getActiveRoute = (
  routes: Record<string, string>,
  currentPath: string
) => {
  const currentRouteKey = Object.keys(routes).find(key =>
    matchPath(currentPath, {
      path: routes[key],
      exact: true,
      strict: false
    })
  );
  return currentRouteKey ? routes[currentRouteKey] : undefined;
};

export default getActiveRoute;
