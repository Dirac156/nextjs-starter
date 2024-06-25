// src/utils/cookies.ts

export const setCookie = (name: string, value: string, options: any = {}) => {
  let cookieString = `${name}=${value};`;

  for (const [key, val] of Object.entries(options)) {
    cookieString += ` ${key}=${val};`;
  }

  document.cookie = cookieString;
};

export const deleteCookie = (name: string, options: any = {}) => {
  setCookie(name, "", { ...options, expires: new Date(0) });
};
