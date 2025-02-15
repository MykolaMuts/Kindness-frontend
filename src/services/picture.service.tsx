import axios from "axios";
import {BACKEND_URL} from "../App.constants.tsx";

// Allowed file types
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
    url: `${BACKEND_URL}/picture/upload`,
    method: 'post',
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: formData,
  });
  return response.data // Return uploaded file URL or success message
};

export const downloadProfilePicture = async (filename: string): Promise<File> => {

  const response = await axios({
    url: `${BACKEND_URL}/picture/download`,
    method: 'get',
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: filename,
  });
  return response.data

}