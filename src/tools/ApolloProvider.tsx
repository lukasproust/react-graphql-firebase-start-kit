import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { RetryLink } from 'apollo-link-retry';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';

import {
  InMemoryCache,
  // IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';

// import localStorage from 'tools/localStorage';
// import schema from 'config/typesSchema.json';

const Provider: React.FC = ({ children }) => {
  // schema configuration
  //   const fragmentMatcher = new IntrospectionFragmentMatcher({
  //     introspectionQueryResultData: schema.data,
  //   });

  // cache configuration
  // const cache = new InMemoryCache({ fragmentMatcher });
  const cache = new InMemoryCache();

  // base link
  const httpLink = createUploadLink({
    uri: process.env.API_HOST,
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('AUTH_TOKEN');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  // handle retry on network errors
  const retryLink = new RetryLink();

  // link chain, httpLink must always be last
  const unifiedLink = authLink.concat(retryLink).concat(httpLink);

  const client = new ApolloClient({ link: unifiedLink, cache });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
