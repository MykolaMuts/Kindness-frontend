import axios from "axios";
import {BACKEND_URL} from "../App.constants.tsx";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB


export const uploadProfilePicture = async (file: File): Promise<string> => {
  if (!file) throw new Error("No file selected.");

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Invalid file type. Only JPG and PNG are allowed.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size exceeds 5MB.");
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await axios({
    url: `${BACKEND_URL}/picture/upload-profile-picture`,
    method: 'post',
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: formData,
  });
  return response.data;
}

export const downloadProfilePicture = async (username: string): Promise<string | null> => {
  try {

    const response = await axios({
      url: `${BACKEND_URL}/picture/download-profile-picture`,
      params: {username},
      method: 'get',
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      responseType: 'blob',
    });

    return URL.createObjectURL(response.data);
  } catch {
    return null;
  }
}