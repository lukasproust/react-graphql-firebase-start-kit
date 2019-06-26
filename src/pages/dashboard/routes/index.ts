import ViewCompactIcon from "@material-ui/icons/ViewCompact";

import Dashboard from "../components/Dashboard";
import { SEGMENTS } from "./segments";
import messages from "./intl";

export default [
  {
    id: "1",
    name: messages.dashboard,
    icon: ViewCompactIcon,
    content: Dashboard,
    path: `/${SEGMENTS.DASHBOARD}`
  }
  // {
  //   id: "2",
  //   name: messages.users,
  //   icon: ViewCompactIcon,
  //   content: Users,
  //   path: `/${SEGMENTS.USERS}`
  // }
];
