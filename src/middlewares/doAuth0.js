const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const auth0config = require('../../config/Auth0.json');

// https://auth0.com/docs/quickstart/backend/nodejs
const jwtSecretParams = {
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `https://${auth0config.customDomain}/.well-known/jwks.json`,
  proxy: auth0config.proxy || undefined,
};
const doAuth0 = jwt({
  secret: jwksRsa.expressJwtSecret(jwtSecretParams),
  audience: auth0config.audience,
  issuer: `https://${auth0config.customDomain}/`,
  algorithms: ['RS256'],
});

module.exports = doAuth0;
