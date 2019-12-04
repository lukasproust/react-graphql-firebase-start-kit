import React, { useState, useContext } from 'react';
import { IntlContext } from 'react-intl';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import ForwardIcon from '@material-ui/icons/Forward';

import UserContext from 'shared/contexts/User';
import useForm from 'shared/hooks/useForm';

import { ROUTES as LOGIN_ROUTES } from 'pages/login/routes';
import { ROUTES as USERS_ROUTES } from 'pages/users/routes';

import loginValidate from './loginValidationRules';
import { Values } from './types';
import messages from './intl';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  location: { state: { from: string }; pathname: string };
  history: { push: (config: { pathname: string }) => void };
}

const Login: React.FC<Props> = ({ location, history, classes }) => {
  const { formatMessage } = useContext(IntlContext);
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [firebaseLoginError, setFirebaseLoginError] = useState<
    string | undefined
  >(undefined);

  const submitForm = (values: Values) => {
    if (!user.signInWithEmailAndPassword) return;

    user
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        history.push({ pathname: USERS_ROUTES.HOME });
      })
      .catch((error: { message: string }) => {
        setFirebaseLoginError(error.message);
        setLoading(false);
      });
  };

  const { values, errors, handleChange, handleSubmit } = useForm<Values>(
    { email: '', password: '', remenberMe: false }, // initial values
    submitForm,
    loginValidate,
  );

  return (
    <div>
      <>
        {user && user.currentUser && (
          <Redirect exact from={LOGIN_ROUTES.HOME} to={USERS_ROUTES.HOME} />
        )}
        {!user ||
          (!user.currentUser && location.pathname !== LOGIN_ROUTES.HOME && (
            <Redirect
              to={{
                pathname: LOGIN_ROUTES.HOME, //  TODO add segment
                state: { from: location },
              }}
            />
          ))}
      </>
      <Grid container className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {formatMessage(messages.signIn)}
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label={formatMessage(messages.emailLabel)}
                name="email"
                autoFocus
                error={errors.length > 0}
                value={values.email}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label={formatMessage(messages.passwordlHint)}
                type="password"
                id="password"
                error={errors.length > 0}
                value={values.password}
                onChange={handleChange}
              />
              {/* TODO: Manage remember me function */}
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={formatMessage(messages.remenberMe)}
              />
              {(errors.length > 0 || firebaseLoginError) && (
                <div className={classes.errorReporter}>
                  {errors.map(error => (
                    <span>{formatMessage(error)}</span>
                  ))}
                  <span>{firebaseLoginError}</span>
                </div>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {loading && (
                  <CircularProgress
                    className={classNames(
                      classes.leftIcon,
                      classes.buttonProgress,
                    )}
                    thickness={6}
                    size={24}
                  />
                )}
                {!loading && <ForwardIcon className={classes.leftIcon} />}
                {formatMessage(messages.signInButton)}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#forgot" variant="body2">
                    {formatMessage(messages.forgotPassword)}
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#signup" variant="body2">
                    {formatMessage(messages.noAccountSignUp)}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Login);
