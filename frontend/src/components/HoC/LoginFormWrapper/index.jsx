import React, { useState } from 'react';
import LoginForm from '@/components/LoginForm'
import { useLoginQuery, useCompleteNewPasswordChallengeQuery } from './services/pokemon'

import { login, completeNewPasswordChallenge } from '@/services/AuthService'

function LoginFormWrapper() {
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

    const handleFormSubmit = async (event) => {
        try {
            const { email, password } = loginInfo
            let {
                AuthenticationResult,
                ChallengeName,
                Session
            } = await login(email, password)

            if (AuthenticationResult) {
                localStorage.setItem('AccessToken', AuthenticationResult.AccessToken)
                localStorage.setItem('RefreshToken', AuthenticationResult.RefreshToken)
                localStorage.setItem('IdToken', AuthenticationResult.IdToken)
                return
            }

            if (ChallengeName === 'NEW_PASSWORD_REQUIRED') {
                // redirect set new password
                let { AuthenticationResult } = await completeNewPasswordChallenge(Session, email, password)

                if (AuthenticationResult) {
                    localStorage.setItem('AccessToken', AuthenticationResult.AccessToken)
                    localStorage.setItem('RefreshToken', AuthenticationResult.RefreshToken)
                    localStorage.setItem('IdToken', AuthenticationResult.IdToken)
                }
            }
        } catch (err) {
            const errorResults = "Error" + err;
            console.log(errorResults)
        }
    }

    return <LoginForm
        {...loginInfo}
        handleChange={handleChange}
        handleClickShowPassword={handleClickShowPassword}
        handleMouseDownPassword={handleMouseDownPassword}
        handleFormSubmit={handleFormSubmit}
        signUpPath={"/sign-up"}
    />
}

export default LoginFormWrapper