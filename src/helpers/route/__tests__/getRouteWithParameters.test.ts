import getRouteWithParameters from '../getRouteWithParameters';

const ROUTES = {
  HOME: '/users',
  LIST: '/users/list',
  DETAIL: '/users/detail/:userId',
  DETAIL_GROUP: '/users/detail/:userId/:groupId',
};

describe('getRouteWithParameters', () => {
  it('should return the correct route with params', () => {
    expect(getRouteWithParameters(ROUTES.DETAIL, { userId: '1' })).toEqual(
      '/users/detail/1',
    );
    expect(getRouteWithParameters(ROUTES.HOME, { userId: '1' })).toEqual(
      '/users',
    );
    expect(
      getRouteWithParameters(ROUTES.DETAIL_GROUP, {
        userId: '1',
        groupId: 'myGroup',
      }),
    ).toEqual('/users/detail/1/myGroup');
  });
  it('should return undefined if the params are falsy', () => {
    expect(getRouteWithParameters(ROUTES.DETAIL, { wrongId: '1' })).toEqual(
      undefined,
    );
  });
});
