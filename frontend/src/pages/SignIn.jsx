import React from 'react';
import { Box } from '@mui/material';
import LoginFormWrapper from '@/components/HoC/LoginFormWrapper'

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
      <LoginFormWrapper />
    </Box >
  )
}

export default SignIn
