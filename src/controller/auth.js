import Axios from "axios";
import config from "../configs/config";

const returnError = (err) => {
  const data = {
    success: false,
    code: 5001,
    message: "network error !",
  };
  return data;
};

export const login = async (username, password) => {
  try {
    const url = `${config.apiserver}/dashboard/auth/login/`;
    const user = await Axios.post(url, {
      username,
      password,
    });
    return user.data;
  } catch (err) {
    return returnError(err);
  }
};

export const register = async (newUser) => {
  try {
    const url = `${config.apiserver}/dashboard/auth/register/`;
    const user = await Axios.post(url, newUser);
    return user.data;
  } catch (err) {
    return returnError(err);
  }
};

export const resetPassword = async (email) => {
  try {
    const url = `${config.apiserver}/dashboard/auth/resetpassword/`;
    const user = await Axios.post(url, email);
    return user.data;
  } catch (err) {
    return returnError(err);
  }
};

export const changePassword = async (newpassword) => {
  try {
    const url = `${config.apiserver}/dashboard/auth/resetpassword/`;
    const user = await Axios.post(url, newpassword);
    return user.data;
  } catch (err) {
    return returnError(err);
  }
};