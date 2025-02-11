import axios from "axios";
import {BACKEND_URL} from "../../App.constants.tsx";

export interface IUserData {
  id: number;
  profilePicUrl: string;
  username: string;
  password: string;
  email: string;
  role: string[];
  serviceData : IUserServiceData
}

export interface IRegistrationForm {
  username: string;
  email: string;
  password: string;
}

export interface IUserServiceData {
  description: string;
  serviceCategory: string[];
  city: string;
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
    url: `${BACKEND_URL}/auth/login`,
    data: userData,
    withCredentials: true,
  });
};

export const fetchUserData = async () => {
  return axios({
    method: 'get',
    url: `${BACKEND_URL}/auth/me`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
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

export async function updateUserServiceData(username: string, data: IUserServiceData) {
  const response = await fetch(`${BACKEND_URL}/user/${username}/update-profile`, {
    method: "put",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function uploadProfilePicture(username: string, file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BACKEND_URL}/user/${username}/upload-profile-picture`, {
    method: "post",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: "include",
    body: formData,
  });
  
  const data = await response.json();
  return data.profilePictureUrl;
}