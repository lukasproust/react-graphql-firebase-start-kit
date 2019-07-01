function isLocalStorageSupported() {
  const testKey = "__localStorageTestKey__";
  try {
    localStorage.setItem(testKey, "");
    localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

const localStorageIsSupported = isLocalStorageSupported();

const customLocalStorage = {
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getItem: (key: string) => {
    // Temporary compatibility bridge
    // Token syntax has changed, if parse fails, fallback on previous format
    // #MIGRATION# 01/03/2017, remove in a few releases
    try {
      return JSON.parse(localStorage.getItem(key) || "null");
    } catch (e) {
      return localStorage.getItem(key) || null;
    }
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);
  }
};

function getCookieKey(key: string) {
  return `localStorage-${key}`;
}

function setCookie(key: string, value: string) {
  document.cookie = `${getCookieKey(key)}=${JSON.stringify(value)}`;
}

const cookieLocalStorage = {
  setItem: (key: string, value: string) => {
    setCookie(key, value);
  },

  getItem: (key: string) => {
    const cookieKey = getCookieKey(key);
    const cookieKeyLength = cookieKey.length;
    const cookies = document.cookie
      .split(/\s*;\s*/)
      .filter(s => s.substring(0, cookieKeyLength) === cookieKey);
    return cookies.length > 0
      ? JSON.parse(cookies[0].slice(cookieKeyLength + 1))
      : null;
  },

  removeItem: (key: string) => {
    setCookie(key, "");
  }
};

export default localStorageIsSupported
  ? customLocalStorage
  : cookieLocalStorage;
