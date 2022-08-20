import React, { useState } from 'react';
import {
  Typography,
  Link,
  FormControl,
  Container,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  Button,
  Box
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'


function LoginForm() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
    showPassword: false
  })

  const handleChange =
    (prop) => (event) => {
      setLoginInfo({ ...loginInfo, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setLoginInfo({
      ...loginInfo,
      showPassword: !loginInfo.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Container maxWidth="sm">
        <FormControl fullWidth margin="dense" required variant="outlined">
          <InputLabel htmlFor="email">email</InputLabel>
          <OutlinedInput label="email" id="email" type="text"
            onChange={handleChange('email')}
          ></OutlinedInput>
        </FormControl>
        <FormControl fullWidth margin="dense" required variant="outlined">
          <InputLabel htmlFor="password">password</InputLabel>
          <OutlinedInput label="password" fullWidth id="password"
            type={loginInfo?.showPassword ? 'text' : 'password'}
            value={loginInfo?.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {loginInfo?.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          ></OutlinedInput>
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
          <Button variant="contained" size="medium">Submit</Button>
        </FormControl>
      </Container>
      <Container>
        <FormControl fullWidth margin="normal">
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', flexGrow: 0.45, height: '1px', backgroundColor: '#dbdbdb' }}></div>
            <div style={{ display: 'flex', flexGrow: 0.1, justifyContent: 'center', color: 'rgba(0, 0, 0, 0.87)' }}>or</div>
            <div style={{ display: 'flex', flexGrow: 0.45, height: '1px', backgroundColor: '#dbdbdb' }}></div>
          </Box>
        </FormControl>
      </Container>
      <Container>
        <FormControl fullWidth margin="normal">
          <Typography>Don't have an account? <Link>Sign Up</Link></Typography>
        </FormControl>
      </Container>
    </div>
  )
}

export default LoginForm