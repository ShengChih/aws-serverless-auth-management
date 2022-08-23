import React from 'react';
import { Box } from '@mui/material';
import FullLayout from '@/layouts/FullLayout'
import RegisteredFormWrapper from '@/components/HoC/RegisteredFormWrapper'

const SignUp = () => {
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
        <RegisteredFormWrapper />
      </Box >
    </FullLayout>
  )
}

export default SignUp
