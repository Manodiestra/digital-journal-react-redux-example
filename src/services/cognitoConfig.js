import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: '<ID>',
    ClientId: '<ID>',
};

export const CognitoDomain = 'https://<name>.auth.<region>.amazoncognito.com'

const UserPool = new CognitoUserPool(poolData);

export default UserPool;
