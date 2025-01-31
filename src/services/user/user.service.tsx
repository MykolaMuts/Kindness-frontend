import axios from "axios";
import {BACKEND_URL} from "../../App.constants.tsx";

export interface IUserData {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string[];
}

export interface IRegistrationForm {
  username: string;
  email: string;
  password: string;
}

export const addUser = (userData: IRegistrationForm) => {
  return axios({
    method: 'post',
    url: `${BACKEND_URL}/register/user`,
    data: userData,
    withCredentials: true,
  });
};

export const loginUser = (userData: { username: string; password: string }) => {
  return axios({
    method: 'post',
    url: `${BACKEND_URL}/login/user`,
    data: userData,
    withCredentials: true,
  });
};

export const logoutUser = () => {
  return axios({
    method: 'post',
    url: `${BACKEND_URL}/logout`,
    withCredentials: true,
  });
};

export const loadUsers = async (): Promise<IUserData[]> => {
    const response = await axios.get(`${BACKEND_URL}/user/getAll`);
    return response.data;
  }
;

export const createUser = async (userData: IUserData) => {
  return await axios.post(`${BACKEND_URL}/user/create`, userData);
};