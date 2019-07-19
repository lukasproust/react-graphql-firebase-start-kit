import React from "react";
import { intlShape, InjectedIntl } from "react-intl";
import { RouteComponentProps } from "react-router-dom";

import withStyles, { WithStyles } from "@material-ui/styles/withStyles";

import styles from "./styles";
import messages from "./intl";

interface MatchParams {
  userId: string;
}

const Users: React.FC<
  WithStyles<typeof styles> & RouteComponentProps<MatchParams>
> = (
  { classes, match },
  { intl: { formatMessage } }: { intl: InjectedIntl }
) => (
  <div className={classes.container}>
    {formatMessage(messages.userDetails)}
    {match.params.userId}
  </div>
);

Users.contextTypes = {
  intl: intlShape.isRequired
};

export default withStyles(styles)(Users);
