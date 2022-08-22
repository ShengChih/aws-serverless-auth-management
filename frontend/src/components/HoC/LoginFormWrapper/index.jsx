import React, { useState } from 'react';
import LoginForm from '@/components/LoginForm'
import {
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    RespondToAuthChallengeCommand
} from "@aws-sdk/client-cognito-identity-provider";


const ClientId = process.env.REACT_APP_AWS_COGNITO_CLIENT_ID
const REGION = process.env.REACT_APP_AWS_COGNITO_REGION
const client = new CognitoIdentityProviderClient({
    region: REGION
});

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
            const initiateAuthParams = {
                AuthFlow: process.env.REACT_APP_AWS_COGNITO_AUTH,
                ClientId: ClientId,
                AuthParameters: {
                    USERNAME: loginInfo.email,
                    PASSWORD: loginInfo.password,
                }
            }
            const initiateAuthCmd = new InitiateAuthCommand(initiateAuthParams)
            let {
                AuthenticationResult,
                ChallengeName,
                ChallengeParameters,
                Session
            } = await client.send(initiateAuthCmd)

            if (!AuthenticationResult && ChallengeName === 'NEW_PASSWORD_REQUIRED') {
                const respond2AuthChallengeCmd = new RespondToAuthChallengeCommand({
                    ChallengeName: ChallengeName,
                    Session: Session,
                    ClientId: ClientId,
                    ChallengeResponses: {
                        USERNAME: loginInfo.email,
                        NEW_PASSWORD: loginInfo.password
                    }
                });

                let {
                    AuthenticationResult,
                    ChallengeName,
                    ChallengeParameters,
                    Session
                } = await client.send(respond2AuthChallengeCmd)

                localStorage.setItem('AccessToken', AuthenticationResult.AccessToken)
                localStorage.setItem('RefreshToken', AuthenticationResult.RefreshToken)
                localStorage.setItem('IdToken', AuthenticationResult.IdToken)
            }

            localStorage.setItem('AccessToken', AuthenticationResult.AccessToken)
            localStorage.setItem('RefreshToken', AuthenticationResult.RefreshToken)
            localStorage.setItem('IdToken', AuthenticationResult.IdToken)
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
    />
}

export default LoginFormWrapper