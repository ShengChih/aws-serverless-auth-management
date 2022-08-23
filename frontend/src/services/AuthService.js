import config from '@/libs/cognito/config'
import {
    CognitoIdentityProviderClient,
    InitiateAuthCommand,
    RespondToAuthChallengeCommand,
    SignUpCommand
} from "@aws-sdk/client-cognito-identity-provider";
//import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

import { createApi } from '@reduxjs/toolkit/query/react'
import cognitoBaseQuery from '@/libs/queries/CognitoBaseQuery'


const { Region, AuthFlow, ClientId, UserPoolId } = config
const client = new CognitoIdentityProviderClient({
    region: Region
});

export const authApi = createApi({
    baseQuery: cognitoBaseQuery(),
    endpoints: (build) => ({
        login: build.query({
            query: (email, password) => ({
                command: InitiateAuthCommand,
                params: {
                    AuthFlow: AuthFlow,
                    ClientId: ClientId,
                    AuthParameters: {
                        USERNAME: email,
                        PASSWORD: password,
                    }
                }
            }),
            transformResponse: (response, meta, arg) => response.data,
        }),
        completeNewPasswordChallenge: build.query({
            query: (email, newPassword) => ({
                command: RespondToAuthChallengeCommand,
                params: {
                    ChallengeName: 'NEW_PASSWORD_REQUIRED',
                    Session: Session,
                    ClientId: ClientId,
                    ChallengeResponses: {
                        USERNAME: email,
                        NEW_PASSWORD: newPassword
                    }
                }
            }),
        }),
        signUp: build.query({
            query: (email, password) => ({
                command: SignUpCommand,
                params: {
                    ClientId: ClientId,
                    Username: email,
                    Password: password,
                    UserAttributes: [{
                        "Name": "nickname",
                        "Value": username
                    }]
                }
            }),
        })
    })
})

export const {
    useLoginQuery,
    useCompleteNewPasswordChallengeQuery,
    useSignUpQuery
} = authApi

export function login(email, password) {
    return client.send(new InitiateAuthCommand({
        AuthFlow: AuthFlow,
        ClientId: ClientId,
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
        }
    }))
}

export function completeNewPasswordChallenge(Session, email, password) {
    return client.send(new RespondToAuthChallengeCommand({
        ChallengeName: 'NEW_PASSWORD_REQUIRED',
        Session: Session,
        ClientId: ClientId,
        ChallengeResponses: {
            USERNAME: email,
            NEW_PASSWORD: password
        }
    }))
}

export function signUp(userInfo) {
    const { username, email, password } = userInfo
    return client.send(new SignUpCommand({
        ClientId: ClientId,
        Username: email,
        Password: password,
        UserAttributes: [{
            "Name": "nickname",
            "Value": username
        }]
    }))
}