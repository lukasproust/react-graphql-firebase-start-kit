import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { RetryLink } from 'apollo-link-retry';
import { createUploadLink } from 'apollo-upload-client';
import { getMainDefinition } from 'apollo-utilities';
import {
  InMemoryCache,
  // IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';

import localStorage from 'tools/localStorage';

// import schema from 'config/typesSchema.json';

const Provider: React.FC = ({ children }) => {
  // schema configuration
  //   const fragmentMatcher = new IntrospectionFragmentMatcher({
  //     introspectionQueryResultData: schema.data,
  //   });

  // cache configuration
  // const cache = new InMemoryCache({ fragmentMatcher });
  const cache = new InMemoryCache();
  const fullHost = process.env.API_HOST;

  // base link
  const httpLink = createUploadLink({
    uri: `${fullHost}/graphql`,
  });

  const getFullToken = () => {
    const token = localStorage.getItem('AUTH_TOKEN');
    return token ? `Bearer ${token}` : null;
  };

  // handle auth
  const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: getFullToken(),
      },
    });
    return forward ? forward(operation) : null;
  });

  // handle retry on network errors
  const retryLink = new RetryLink();

  const link = split(({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  }, httpLink);

  // link chain, httpLink must always be last
  const unifiedLink = middlewareLink.concat(retryLink).concat(link);

  const client = new ApolloClient({ link: unifiedLink, cache });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Provider;
