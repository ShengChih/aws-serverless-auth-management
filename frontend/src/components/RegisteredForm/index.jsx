import React from 'react';
import {
  FormControl,
  Container,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  Button
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material'


function RegisteredForm({
  username,
  email,
  password,
  showPassword,
  handleChange,
  handleClickShowPassword,
  handleMouseDownPassword,
  handleFormSubmit
}) {
  return (
    <div>
      <Container maxWidth="sm">
        <FormControl fullWidth margin="dense" required variant="outlined">
          <InputLabel htmlFor="username">username</InputLabel>
          <OutlinedInput label="username" id="username" type="text"
            onChange={handleChange('username')}
            value={username}
          ></OutlinedInput>
        </FormControl>
        <FormControl fullWidth margin="dense" required variant="outlined">
          <InputLabel htmlFor="email">email</InputLabel>
          <OutlinedInput label="email" id="email" type="text"
            onChange={handleChange('email')}
            value={email}
          ></OutlinedInput>
        </FormControl>
        <FormControl fullWidth margin="dense" required variant="outlined">
          <InputLabel htmlFor="password">password</InputLabel>
          <OutlinedInput label="password" fullWidth id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          ></OutlinedInput>
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined">
          <Button variant="contained" onClick={handleFormSubmit} size="medium">Register</Button>
        </FormControl>
      </Container>
    </div>
  )
}

export default RegisteredForm