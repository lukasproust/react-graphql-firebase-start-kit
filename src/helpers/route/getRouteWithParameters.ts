// this regex matches /:abc123? and the literal /undefined
const UNSET_OPTIONNAL_AT_END = /\/:.*\?$|\/undefined$/;

const getRouteWithParameters = (
  route: string,
  params: Record<string, string> = {},
  queryParams: Record<string, string> = {},
) => {
  let result = route;
  Object.keys(params).forEach(key => {
    const value = encodeURIComponent(params[key]);
    const regex = new RegExp(`\\/(:${key}\\??)`);
    result = result.replace(regex, `/${value}`);
  });

  // Strip optional unset parameters at end of route
  while (result.match(UNSET_OPTIONNAL_AT_END)) {
    result = result.replace(UNSET_OPTIONNAL_AT_END, '');
  }
  const stringifiedQueryParams = Object.keys(queryParams)
    .filter(key => queryParams[key] !== undefined && queryParams[key] !== null)
    .reduce((acc, key, index) => {
      const encodedKey = encodeURIComponent(key);
      const value = encodeURIComponent(queryParams[key]);

      return `${acc}${index === 0 ? '?' : '&'}${encodedKey}=${value}`;
    }, '');

  const routeWithParameters = `${result}${stringifiedQueryParams}`;

  if (
    process.env.NODE_ENV === 'development' &&
    routeWithParameters.includes('/:')
  ) {
    // eslint-disable-next-line no-console
    console.error('Missing parameter in route ', routeWithParameters);
  } else if (routeWithParameters.includes('/:')) {
    return undefined;
  }

  return routeWithParameters;
};

export default getRouteWithParameters;
