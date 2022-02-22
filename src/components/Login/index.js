import React, {useState} from 'react';
import {Button, Grid, TextField} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {Navigate} from 'react-router-dom';
import {getToken} from '../../use/getters';
import {setToken} from '../../use/actions';

const defaultValues = {username: '', password: ''};

const Login = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [loadingState, setLoadingState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const isAuth = !!getToken();

  const inputChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setErrorMessage('');
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoadingState(true);
    const token = await setToken(formValues);
    token?.error && setErrorMessage(token.error);
    console.log(token);
    setLoadingState(false);
  };

  if (isAuth) {
    return <Navigate to="/"/>;
  }

  return (
    <div className="container">
      <form onSubmit={submit}>
        <Grid container alignItems="center" justify="center" direction="column">
          <Grid item>
            <TextField
              id="login"
              name="username"
              label="Имя пользователя"
              error={!!errorMessage}
              type="text"
              margin="dense"
              value={formValues.name}
              onChange={inputChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="password"
              name="password"
              error={!!errorMessage}
              label="Пароль"
              type="password"
              margin="dense"
              value={formValues.password}
              onChange={inputChange}
            />
          </Grid>
          <p style={{color: 'red'}}>{errorMessage}</p>
          <LoadingButton
            loading={loadingState}
            variant="contained"
            color="primary"
            type="submit"
          >
            Войти
          </LoadingButton >
        </Grid>
      </form>
    </div>
  );
};

export default Login;
