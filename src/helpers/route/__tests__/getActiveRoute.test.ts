import getActiveRoute from '../getActiveRoute';

const ROUTES = {
  HOME: '/users',
  LIST: '/users/list',
  DETAIL: '/users/detail/:userId',
  DETAIL_GROUP: '/users/detail/:userId/:groupId',
};

describe('getRouteWithParameters', () => {
  it('should return the correct route without params', () => {
    expect(getActiveRoute(ROUTES, '/users/detail/1')).toEqual(ROUTES.DETAIL);
    expect(getActiveRoute(ROUTES, '/users/list')).toEqual(ROUTES.LIST);
    expect(getActiveRoute(ROUTES, '/users/detail/1/10')).toEqual(
      ROUTES.DETAIL_GROUP,
    );
  });
  it('should return undefined', () => {
    expect(getActiveRoute(ROUTES, 'users/groups')).toEqual(undefined);
    expect(getActiveRoute(ROUTES, 'users/groups/:groupId')).toEqual(undefined);
  });
});
