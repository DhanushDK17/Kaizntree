// RegisterPage.js
import { useState } from 'react';
import { Button, TextField, Typography, Box, Container, Link } from '@mui/material';
import { auth } from '../api/auth';
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const handleUserNameChange = (event) => {
    setUserName(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const navigate = useNavigate()

  const handleRegister = () => {
    auth.register({
      username: userName,
      password,
      email
    }).then(response => {
      navigate('/')
    })
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
          autoFocus
          onChange={handleUserNameChange}
        />
        <TextField
          value={email}
          margin="normal"
          required
          fullWidth
          id="email"
          placeholder="sample@sample.com"
          name="email"
          autoComplete="email"
          onChange={handleEmailChange}
        />
        <TextField
          value={password}
          margin="normal"
          required
          fullWidth
          name="password"
          placeholder="*************"
          type="password"
          id="password"
          autoComplete="new-password"
          onChange={handlePasswordChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={handleRegister}
          sx={{ mt: 3, mb: 2 }}
        >
          Create Account
        </Button>
        <Link href="/" variant="body2">
          {"Have an account? Log In"}
        </Link>
      </Box>
    </Container>
  );
}
