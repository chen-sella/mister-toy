import { httpService } from './http.service.js';

const AUTH_URL = 'auth/';

export const userService = {
  login,
  signUp,
  logout
};

async function login(user) {
  try {
    const loggedInUser = await httpService.post(AUTH_URL + 'login', user);
    return loggedInUser;
  } catch (err) {
    console.log('cant save user', err);
  }
}

async function signUp(user) {
  try {
    const savedUser = await httpService.post(AUTH_URL + 'signup', user);
    return savedUser;
  } catch (err) {
    console.log('cant save user', err);
  }
}

async function logout() {
  try {
    await httpService.post(AUTH_URL + 'logout');
  } catch (err) {
    console.log('cant logout user', err);
  }
}
