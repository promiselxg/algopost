import React, {useState, useEffect} from 'react';
import { Container, Avatar, Typography, Box, Grid, Checkbox, CssBaseline, TextField,  FormControlLabel,  Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom'
import { Message, Loading } from '../error';
import  { useDispatch, useSelector } from "react-redux";
import { login } from '../../Redux/Actions/userActions';



const theme = createTheme();

export default function SignIn(location, history) {
  const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  dispatch(login(data.email, data.password));
    
  };

  const [errorMsg, setErrorMsg] =useState("")
  const dispatch = useDispatch();
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  
  useEffect(() => {
  if (userInfo) {
    history.push(redirect);
  }

    if(error) {
      setErrorMsg(error.data.message)
  }
  }, [userInfo, history, redirect]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {errorMsg && <Message variant="alert-danger">{errorMsg}</Message>}
        {loading && <Loading />}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
  );
  }