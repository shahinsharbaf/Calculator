import Axios from "axios";
import config from "../configs/config";

const returnError = (err) => {
  const data = {
    success: false,
    code: 5001,
    message: "There is a problem",
  };
  return data;
};

export const getUsers = async (newData) => {
  try {
    const url = `${config.apiserver}/dashboard/user/getusers/`;
    const result = await Axios.post(url, newData);
    return result.data;
  } catch (err) {
    return returnError(err);
  }
};

export const storeUser = async (newData) => {
  try {
    const url = `${config.apiserver}/dashboard/user/storeUser/`;
    const result = await Axios.post(url, newData);
    return result.data;
  } catch (err) {
    return returnError(err);
  }
};

export const getUser = async (newData) => {
  try {
    const url = `${config.apiserver}/dashboard/user/getuser/`;
    const result = await Axios.post(url, newData);
    return result.data;
  } catch (err) {
    return returnError(err);
  }
};

export const updateUser = async (newData, image) => {
  try {
    const formData = new FormData();
    formData.append("data", JSON.stringify(newData));
    formData.append("image", image);
    const url = `${config.apiserver}/dashboard/user/updateuser/`;
    const result = await Axios.post(url, formData, );
    return result.data;
  } catch (err) {
    return returnError(err);
  }
};

export const deleteUser = async (newData) => {
  try {
    const url = `${config.apiserver}/dashboard/user/deleteuser/`;
    const result = await Axios.post(url, newData);
    return result.data;
  } catch (err) {
    return returnError(err);
  }
};

