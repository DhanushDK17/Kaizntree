// LoginPage.js
import { Button, TextField, Typography, Box, Container, Link, Stack } from '@mui/material';
import { auth } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { clearCookie } from '../utils';

export const LoginPage = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")
    const [userName, setUserName] = useState("Dhanush")
    const [password, setPassword] = useState("1234")
    const handleLogin = () => {
        auth.login({username: userName, password})
        .then(response => {
          navigate('/dashboard')
        })
        .catch(error => {
          clearCookie("sessionId")
          clearCookie("csrftoken")
          setErrorMessage(error.message)
        })
    }
    const handleUserNameChange = (event) => {
        setUserName(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
          Kaizntree
        </Typography>
        <TextField
        value={userName}
          margin="normal"
          required
          fullWidth
          id="username"
          placeholder="Username"
          name="username"
          autoComplete="username"
          onChange={handleUserNameChange}
          autoFocus
        />
        <TextField
        value={password}
          margin="normal"
          required
          fullWidth
          name="password"
          placeholder='********'
          type="password"
          id="password"
          onChange={handlePasswordChange}
          autoComplete="current-password"
        />
        <Typography color={"error"}>{errorMessage}</Typography>
        <Stack direction="row">
            <Button
            type="submit"
            fullWidth
            size='small'
            variant="contained"
            onClick={handleLogin}
            sx={{ mt: 3, mb: 2 }}
            >
            Log In
            </Button>
            <Button
            type="submit"
            fullWidth
            size='small'
            variant="outlined"
            sx={{ mb: 2 }}
            onClick={() => navigate('/register')}
            >
            Create Account
            </Button>
        </Stack>
        <Link href="#" variant="body2">
          Forgot Password
        </Link>
      </Box>
    </Container>
  );
}