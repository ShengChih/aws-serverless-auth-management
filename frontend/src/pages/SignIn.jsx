import React from 'react';
import { Box } from '@mui/material';
import LoginForm from '@/components/LoginForm'

const SignIn = () => {
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: 'auto',
        maxWidth: '400px',
        height: '100%'
      }}
    >
      <LoginForm />
    </Box >
  )
}

export default SignIn
