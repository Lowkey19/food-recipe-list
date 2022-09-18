import Cookies, { Cookie, CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const getCookie = (name: string): any => {
  const token = cookies.get(name);
  if (!token) {
    return null;
  }
  return token;
};

export const setCookie = (name: string, value: Cookie, options?: CookieSetOptions): void =>
  cookies.set(name, value, options);
export const removeCookie = (name: string): void => cookies.remove(name);
