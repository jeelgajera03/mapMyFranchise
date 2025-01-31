const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const {getItem, setItem} = require('./cache');

// Get Public Key
async function getPublicKey(jwksUri, kid) {
  let item = getItem(kid);

  if (item) {
    return item.result;
  }

  const client = jwksClient({
    jwksUri: jwksUri,
  });
  const key = await client.getSigningKey(kid);
  const pubkey = key.getPublicKey();
  setItem(key.kid, pubkey);

  item = getItem(kid);

  if (!item) {
    throw new Error('public key not found');
  }
  return pubkey;
}

// Verify Token
module.exports = function verify(token, options) {
  const {jwksUri} = options;
  let decoded;
  let kid;

  try {
    decoded = jwt.decode(token, {complete: true, json: true});
    kid = decoded.header.kid;

    if (!kid) {
      throw new Error('kid missing from token header');
    }
  } catch (error) {
    console.error(error);
    throw new Error('invalid token');
  }


  return getPublicKey(jwksUri, kid).then((key) => {
    return jwt.verify(token, key, {
      algorithms: ['RS256'],
      nonce: decoded.header.nonce,
    });
  });
};
