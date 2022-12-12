import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../actions';
import SigninStyles from './styles/Signin';
import Alert from '@material-ui/lab/Alert';

const SignIn = (props) => {
      const { setToken } = props
      const classes = SigninStyles();
      const navigate = useNavigate()
      const [alert, setAlert] = useState({
            status: "",
            msg: "",
            type: ""
      });
      const handleSubmit = async (event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const payload = {
                  email: data.get("email"),
                  password: data.get("password"),
            };
            try {
                  const data = await adminLogin(payload);
                  localStorage.setItem(
                        "userDetail",
                        Object.entries(data.detail).length > 0
                              ? JSON.stringify(data.detail)
                              : JSON.stringify(null)
                  );
                  setAlert({
                        status: true,
                        msg: "User Logged In",
                        type: "success"
                  });
                  setToken(data.token);
                  setTimeout(() => {
                        setAlert({ status: false });
                        navigate("/");
                  }, 3000);
            } catch (error) {
                  setAlert({
                        status: true,
                        msg: error.message,
                        type: "error"
                  });
                  setTimeout(() => {
                        setAlert({ status: false });
                  }, 3000);
            }
      };
      return (
            <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                              <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                              Sign in
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={handleSubmit}>
                              <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value="amjad@desolint.com"
                              />
                              <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value="123456abc"
                              />
                              <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                              />
                              <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                              >
                                    Sign In
                              </Button>
                              {alert.status && (
                                    <Alert severity={alert.type}>{alert.msg}</Alert>
                              )}
                        </form>
                  </div>
            </Container>
      );
}

export default SignIn