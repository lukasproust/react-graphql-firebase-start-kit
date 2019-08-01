import React, { useState } from 'react';
import SnackbarMaterial from '@material-ui/core/Snackbar';
import { ApolloError } from 'apollo-client/errors/ApolloError';

import isDev from 'helpers/environement/isDev';
import SnackbarContentWrapper from './SnackbarContentWrapper';
import { variantIcon } from './SnackbarContentWrapper/constants';

interface Props {
  message: string;
  variant?: keyof typeof variantIcon;
  error?: ApolloError | string | boolean;
  closable?: boolean;
}

const Snackbar: React.FC<Props> = ({
  message,
  error,
  variant = 'error',
  closable = true,
}) => {
  const [errorClosed, setErrorClosed] = useState(false);

  return (
    <SnackbarMaterial
      open={!!error && !errorClosed}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <SnackbarContentWrapper
        onClose={() => setErrorClosed(true)}
        variant={variant}
        closable={closable}
        message={isDev() ? JSON.stringify(error) : message}
      />
    </SnackbarMaterial>
  );
};

export default Snackbar;
