function isLocalStorageSupported() {
  const testKey = '__localStorageTestKey__';
  try {
    localStorage.setItem(testKey, '');
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

const localStorageIsSupported = isLocalStorageSupported();

const customLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getItem: key => {
    // Temporary compatibility bridge
    // Token syntax has changed, if parse fails, fallback on previous format
    // #MIGRATION# 01/03/2017, remove in a few releases
    try {
      return JSON.parse(localStorage.getItem(key) || 'null');
    } catch (e) {
      return localStorage.getItem(key) || null;
    }
  },

  removeItem: key => {
    localStorage.removeItem(key);
  },
};

function getCookieKey(key) {
  return `localStorage-${key}`;
}

function setCookie(key, value) {
  document.cookie = `${getCookieKey(key)}=${JSON.stringify(value)}`;
}

const cookieLocalStorage = {
  setItem: (key, value) => {
    setCookie(key, value);
  },

  getItem: key => {
    const cookieKey = getCookieKey(key);
    const cookieKeyLength = cookieKey.length;
    const cookies = document.cookie
      .split(/\s*;\s*/)
      .filter(s => s.substring(0, cookieKeyLength) === cookieKey);
    return cookies.length > 0
      ? JSON.parse(cookies[0].slice(cookieKeyLength + 1))
      : null;
  },

  removeItem: key => {
    setCookie(key, '');
  },
};

export default (localStorageIsSupported
  ? customLocalStorage
  : cookieLocalStorage);
