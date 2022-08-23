import React from 'react';
import { Box } from '@mui/material';
import FullLayout from '@/layouts/FullLayout'
import LoginFormWrapper from '@/components/HoC/LoginFormWrapper'

const SignIn = () => {
  return (
    <FullLayout>
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
    </FullLayout>
  )
}

export default SignIn
