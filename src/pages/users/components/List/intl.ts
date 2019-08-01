import { defineMessages } from 'react-intl';

export default defineMessages({
  noUsers: {
    id: 'users.list.no.users-label',
    defaultMessage: 'No users for this project yet',
  },
  name: {
    id: 'users.list.name-label',
    defaultMessage: 'Name',
  },
  email: {
    id: 'users.list.email-label',
    defaultMessage: 'Email',
  },
  group: {
    id: 'users.list.group-label',
    defaultMessage: 'Group',
  },
  createdAt: {
    id: 'users.list.created.at-label',
    defaultMessage: 'Created At',
  },
  updatedAt: {
    id: 'users.list.updated.at-label',
    defaultMessage: 'Updated At',
  },
  actions: {
    id: 'users.list.actions-label',
    defaultMessage: 'Actions',
  },
  errorFetchUsers: {
    id: 'users.list.error-label',
    defaultMessage: 'Cannot fetch users...',
  },
});
