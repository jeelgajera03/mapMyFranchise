const cache = new Map();

// Get Expiry
function getExpiry() {
  const now = new Date().getTime();

  return now + 60 * 60 * 1000;
}

// Set Cache item
function setItem(key, value) {
  return cache.set(key, {
    result: value,
    expiry: getExpiry(),
  });
}

// Get Cache item
function getItem(key) {
  const value = cache.get(key);
  const now = new Date().getTime();

  if (!value) {
    return null;
  }

  if (value.expiry < now) {
    cache.delete(key);
    return null;
  }
  return value;
}

module.exports = {
  getItem,
  setItem,
};
