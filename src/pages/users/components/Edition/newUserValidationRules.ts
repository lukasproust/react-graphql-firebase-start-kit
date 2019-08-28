import { Error } from 'shared/hooks/useForm';

import { Values } from './types';
import messages from './intl';

const validateNewUserForm = (values: Values) => {
  const errors: Error[] = [];

  if (!values.email) {
    errors.push(messages.errorEmailRequired);
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.push(messages.errorEmailNotValid);
  } else if (!values.displayName) {
    errors.push(messages.errorDisplayNameRequired);
  }
  return errors;
};

export default validateNewUserForm;
