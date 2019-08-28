import { defineMessages } from 'react-intl';

export default defineMessages({
  userEdition: {
    id: 'users.edition.edition.title-message',
    defaultMessage: 'User Edition',
  },
  name: {
    id: 'users.edition.user.name-label',
    defaultMessage: 'Name',
  },
  errorDisplayNameRequired: {
    id: 'users.edition.user.display-name-required-label',
    defaultMessage: 'Name is required',
  },
  email: {
    id: 'users.edition.user.email-label',
    defaultMessage: 'Email',
  },
  errorEmailRequired: {
    id: 'users.edition.user.error-required-email-label',
    defaultMessage: 'Email is required',
  },
  errorEmailNotValid: {
    id: 'users.edition.user.error-no-valid-email-label',
    defaultMessage: 'Email adress is invalid',
  },
  password: {
    id: 'users.edition.user.password-label',
    defaultMessage: 'Password',
  },
  errorPasswordTooShort: {
    id: 'users.edition.user.error-to-short-password-email-label',
    defaultMessage: 'Email is to short ( 8 caract at least )',
  },
  emailVerified: {
    id: 'users.edition.user.email-verified-label',
    defaultMessage: 'Email Verified',
  },
  createUser: {
    id: 'users.edition.user.create-button-label',
    defaultMessage: 'Create User',
  },
  saveUser: {
    id: 'users.edition.user.save-button-label',
    defaultMessage: 'Save User',
  },
  deleteUser: {
    id: 'users.edition.user.delete-button-label',
    defaultMessage: 'Delete User',
  },
  errorOnSaved: {
    id: 'users.edition.user.error-saved-message',
    defaultMessage: 'Ooops there is an error on user saved...',
  },
  errorOnFetch: {
    id: 'users.edition.user.error-fetch-message',
    defaultMessage: 'Ooops there is an error on fetch users...',
  },
});
