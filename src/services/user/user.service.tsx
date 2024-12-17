import axios from "axios";
import { BACKEND_URL } from "../../App.constants";

export interface IUserData {
  username: string;
  password: string;
  email: string;
}

export const addUser = (userData: IUserData) => {
  return axios({
    method: 'post',
    url: `${BACKEND_URL}/register/user`,
    data: userData,
    // withCredentials: true,
  });
};

export const loginUser = (userData: { username: string; password: string }): Promise<void> => {
  return axios({
    method: 'post',
    url: `${BACKEND_URL}/login/user`,
    data: userData,
    // withCredentials: true,
  });
};

export const loadUsers = async (): Promise<IUserData[]> => {
  const response = await axios.get(`${BACKEND_URL}/user/getAll`);
  return response.data;}
;

export const createUser = async (userData: IUserData) => {
  return await axios.post(`${BACKEND_URL}/user/create`, userData);
};