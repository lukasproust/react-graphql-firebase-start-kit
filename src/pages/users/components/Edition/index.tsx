import React, { useContext, useEffect } from 'react';
import { IntlContext, MessageDescriptor } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import classNames from 'classnames';

import Paper from '@material-ui/core/Paper';
import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';

import Snackbar from 'shared/components/material/Snackbar';
import useForm from 'shared/hooks/useForm';
import { ROUTES } from 'pages/users/routes';
import useGetUserById from './queries/useGetUserById';
import useUpdateUserMutation from './mutations/useUpdateUser';
import useCreateUserMutation from './mutations/useCreateUser';
import useDeleteUserMutation from './mutations/useDeleteUser';
import newUserValidate from './newUserValidationRules';
import { Values, MatchParams } from './types';
import styles from './styles';
import messages from './intl';

const Users: React.FC<
  WithStyles<typeof styles> & RouteComponentProps<MatchParams>
> = ({ classes, match, history }) => {
  const { params: { userId = undefined } = {} } = match || {};
  const { formatMessage } = useContext(IntlContext);
  // Mutations
  const [
    createUser,
    { loading: loadingCreateUser, error: errorCreateUser },
  ] = useCreateUserMutation();
  const [
    updateUser,
    { loading: loadingUpdateUser, error: errorUpdateUser },
  ] = useUpdateUserMutation();
  const [
    deleteUser,
    { loading: loadingDeleteUser, error: errorDeleteUser },
  ] = useDeleteUserMutation();

  const submitForm = (values: Values) => {
    if (userId) updateUser({ variables: { id: userId, ...values } });
    else
      createUser({ variables: { ...values } }).then(() =>
        history.push(ROUTES.USER_LIST),
      );
  };

  const initialValues: Values = {
    email: '',
    emailVerified: false,
    password: '',
    displayName: '',
  };
  const { values, errors, handleChange, handleSubmit, setValues } = useForm<
    Values
  >(initialValues, submitForm, newUserValidate);

  // Get User Query Hook if userId is present
  const {
    loading: loadingQuery = false,
    error: errorQuery = undefined,
    data: { user = undefined } = {},
  } = userId ? useGetUserById({ variables: { id: userId } }) : {};

  useEffect(() => {
    setValues({
      displayName: user ? user.displayName : '',
      email: user ? user.email : '',
      emailVerified: user ? user.emailVerified : false,
      password: '',
    });
  }, [user]);

  return (
    <>
      <Paper className={classes.paper}>
        <div className={classes.contentWrapper}>
          <Typography variant="h4">
            {formatMessage(messages.userEdition)}
          </Typography>
          {loadingQuery && (
            <LinearProgress className={classes.linearProgress} />
          )}
          {!loadingQuery && (
            <form
              className={classes.container}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                id="user-name"
                label={formatMessage(messages.name)}
                value={values.displayName}
                name="displayName"
                onChange={handleChange}
                margin="normal"
                autoComplete="off"
                fullWidth
              />
              <TextField
                id="user-email"
                label={formatMessage(messages.email)}
                value={values.email}
                name="email"
                onChange={handleChange}
                margin="normal"
                autoComplete="off"
                required={userId === undefined}
                fullWidth
              />
              {!userId && (
                <TextField
                  id="user-password"
                  label={formatMessage(messages.password)}
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  margin="normal"
                  autoComplete="new-password"
                  fullWidth
                />
              )}
              <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                  <FormControlLabel
                    label={formatMessage(messages.emailVerified)}
                    control={
                      <Checkbox
                        color="primary"
                        name="emailVerified"
                        checked={values.emailVerified}
                        onChange={handleChange}
                        value={'emailVerified'}
                      />
                    }
                  />
                </FormGroup>
              </FormControl>
              <div className={classes.actions}>
                <div className={classes.wrapper}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    color="primary"
                    className={classes.button}
                    disabled={!!errorQuery}
                  >
                    {(loadingUpdateUser || loadingCreateUser) && (
                      <CircularProgress
                        className={classNames(
                          classes.leftIcon,
                          classes.buttonProgress,
                        )}
                        thickness={6}
                        size={24}
                      />
                    )}
                    {!loadingUpdateUser && (
                      <SaveIcon className={classes.leftIcon} />
                    )}
                    {formatMessage(
                      userId ? messages.saveUser : messages.createUser,
                    )}
                  </Button>
                </div>
                {userId && (
                  <div className={classes.wrapper}>
                    <Button
                      variant="contained"
                      size="large"
                      className={classNames(
                        classes.button,
                        classes.deleteButton,
                      )}
                      disabled={!!errorQuery}
                      onClick={() =>
                        deleteUser({ variables: { id: userId } }).then(() =>
                          history.push(ROUTES.USER_LIST),
                        )
                      }
                    >
                      {loadingDeleteUser && (
                        <CircularProgress
                          className={classNames(
                            classes.leftIcon,
                            classes.buttonProgress,
                          )}
                          thickness={6}
                          size={24}
                        />
                      )}
                      {!loadingDeleteUser && (
                        <DeleteIcon className={classes.leftIcon} />
                      )}
                      {formatMessage(messages.deleteUser)}
                    </Button>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </Paper>
      <Snackbar
        error={errorCreateUser || errorUpdateUser || errorDeleteUser}
        message={formatMessage(messages.errorOnSaved)}
      />
      <Snackbar
        error={errorQuery}
        message={formatMessage(messages.errorOnFetch)}
      />
      {errors.map((error: MessageDescriptor) => (
        <Snackbar
          key={formatMessage(error)}
          error={formatMessage(error)}
          variant={'warning'}
          closable={false}
          message={formatMessage(error)}
        />
      ))}
    </>
  );
};

export default withStyles(styles)(withRouter(Users));
