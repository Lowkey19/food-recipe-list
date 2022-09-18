import { api } from '../helpers/api';

export async function login(param: { email: string, password: string }) {
  const { email, password } = param;
  try {
    await api({
      url: '/auth/login',
      method: 'post',
      withCredentials: true,
      data: {
        email,
        password,
      }
    });
  } catch (e) {
    throw e;
  }
}

export async function logout() {
  try {
    await api({
      url: '/auth/logout',
      method: 'post',
      withCredentials: true,
    });
  } catch (e) {
    throw e;
  }
}

export async function getUserInfo() {
  try {
    const { data } = await api({
      url: '/auth/userInfo',
      method: 'get',
      withCredentials: true,
    });

    return data;
  } catch (e) {
    return undefined;
  }
}
