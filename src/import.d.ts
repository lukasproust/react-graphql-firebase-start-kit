// Fake wildcard module stubs to silence errors in TS imports
// https://stackoverflow.com/questions/43638454/webpack-typescript-image-import?rq=1

/* eslint-disable @typescript-eslint/no-explicit-any, import/export */

declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.gql' {
  const value: any;
  export default value;
}
