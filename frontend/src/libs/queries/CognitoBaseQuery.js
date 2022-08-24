import config from '@/libs/cognito/config'
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
const { Region } = config
const client = new CognitoIdentityProviderClient({
    region: Region
});


const CognitoBaseQuery = () =>
    async ({ command, params }) => {
        try {
            const result = await client.send(new command(params))
            return { data: result }
        } catch (cognitoError) {
            let err = cognitoError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    }

export default CognitoBaseQuery