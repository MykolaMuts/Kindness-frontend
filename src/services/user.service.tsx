import axios from "axios";
import {BACKEND_URL, IRegistrationForm, IUserData, IUserServiceData} from "../App.constants.tsx";

export const addUser = (userData: IRegistrationForm) => {
  return axios({
    method: 'post',
    url: `${BACKEND_URL}/register/user`,
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

export const loginUser = (userData: { username: string; password: string }) => {
  return axios({
    method: 'post',
    url: `${BACKEND_URL}/auth/login`,
    data: userData,
    withCredentials: true,
  });
};

export const fetchMyUserData = async () => {
  return axios({
    method: 'get',
    url: `${BACKEND_URL}/auth/me`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true,
  });
};

export const fetchUserData = async (id: number): Promise<IUserData> => {
  const response = await axios({
    method: 'get',
    params: {id},
    url: `${BACKEND_URL}/user/getById`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true,
  })
  return response.data
};

export async function updateUserServiceData(data: IUserServiceData) {
  return axios({
    method: 'put',
    url: `${BACKEND_URL}/user/update-profile`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true,
    data: data
  });
}