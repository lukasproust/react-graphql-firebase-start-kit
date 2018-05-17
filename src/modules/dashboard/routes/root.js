import ViewCompactIcon from 'material-ui/svg-icons/image/view-compact';
import Dashboard from 'modules/dashboard/components/Dashboard';
import Users from 'modules/dashboard/components/Users';

import messages from './intl';

export default [
  {
    id: '1',
    name: messages.dashboard,
    icon: ViewCompactIcon,
    content: Dashboard,
    path: '/dashboard',
  },
  {
    id: '2',
    name: messages.users,
    icon: ViewCompactIcon,
    content: Users,
    path: '/users',
  },
];
