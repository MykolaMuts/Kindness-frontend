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
  serviceCategory: string;
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

export async function uploadProfilePicture(username: string, file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`/user/${username}/upload-profile-picture`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload profile picture");
  }

  const data = await response.json();
  return data.profilePictureUrl;
}

export async function updateProfile(username: string, profileData: any) {
  const response = await fetch(`/users/${username}/update-profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return response.json();
}

export const loadUsers = async (): Promise<IUserData[]> => {
    const response = await axios.get(`${BACKEND_URL}/user/getAll`);
    return response.data;
  }
;

export const createUser = async (userData: IUserData) => {
  return await axios.post(`${BACKEND_URL}/user/create`, userData);
};