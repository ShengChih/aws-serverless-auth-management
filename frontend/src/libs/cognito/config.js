const config = {
    ClientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID,
    AuthFlow: process.env.REACT_APP_AWS_COGNITO_AUTH,
    Region: process.env.REACT_APP_AWS_COGNITO_REGION,
    UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID
}
export default config