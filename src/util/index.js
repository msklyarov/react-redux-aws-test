import { CognitoUserPool,
  CognitoUser, AuthenticationDetails, CognitoId } from 'amazon-cognito-identity-js'
import AWS from 'aws-sdk'
import config from '../../config'

window.checkAuthenticatedStatus = () => {
  return window.localStorage.getItem('cognitoAuthenticated');
};

window.getAwsData = () => {
  return window.localStorage.getItem('awsData');
};

function getUserPool() {
  var poolData = {
    UserPoolId: config.UserPoolId,
    ClientId : config.ClientId
  };

  return new CognitoUserPool(poolData);
}

window.login = (username, password) => {
  var authenticationData = {
    Username : username,
    Password : password,
  };
  var authenticationDetails = new AuthenticationDetails(authenticationData);

  var userPool = getUserPool();

  var userData = {
    Username : username,
    Pool : userPool
  };

  var cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function () {
        window.localStorage.setItem('cognitoAuthenticated', true);
        console.log('authenticated');
        resolve();
      },

      onFailure: function(err) {
        reject(err);
      },
    });
  })
};

window.getIdentityIAm = () => {
  var userPool = getUserPool();

  var cognitoUser = userPool.getCurrentUser();

  return new Promise((resolve, reject) => {

    if (cognitoUser != null) {

      cognitoUser.getSession(function (err, session) {
        if (err) {
          alert(err);
          return;
        }

        AWS.config.region = config.region;

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: config.IdentityPoolId,
          Logins: {
            // Change the key below according to the specific region your user pool is in.
            [`cognito-idp.${config.region}.amazonaws.com/${config.UserPoolId}`]: session.getIdToken().getJwtToken()
          }
        });

        AWS.config.credentials.get(function () {

          var apigClient = apigClientFactory.newClient({
            accessKey: AWS.config.credentials.accessKeyId,
            secretKey: AWS.config.credentials.secretAccessKey,
            sessionToken: AWS.config.credentials.sessionToken,
            region: config.region
          });

          return apigClient.identityiamGet(null, null, {headers: {}})
            .then(res => {
              console.log('identity received');
              window.localStorage.setItem('awsData', res.data)
              resolve(res.data);
            })
            .catch(err => {
              console.log('identity not received');
              reject(err);
            });
        });
      });
    } else {
      window.localStorage.removeItem('cognitoAuthenticated');
      console.log('cognitoUser is null');
      reject('cognitoUser is null');
    }
  });
};

window.logout = () => {
  var userPool = getUserPool();

  var cognitoUser = userPool.getCurrentUser();

  return new Promise((resolve, reject) => {
    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          reject(err);
          return;
        }

        AWS.config.region = config.region;

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: config.IdentityPoolId,
          Logins: {
            // Change the key below according to the specific region your user pool is in.
            [`cognito-idp.${config.region}.amazonaws.com/${config.UserPoolId}`]: session.getIdToken().getJwtToken()
          }
        });

        AWS.config.credentials.clearCachedId();
      });

      cognitoUser.signOut();
      window.localStorage.removeItem('cognitoAuthenticated');
      console.log('signOut');
      resolve();
    }
  });
};
