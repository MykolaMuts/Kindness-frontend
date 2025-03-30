import axios from "axios";
import {BACKEND_URL, IEventData, IEventRequestData} from "../App.constants.tsx";

export const addEvent = (eventData: IEventRequestData) => {
  return axios({
    method: 'post',
    url: `${BACKEND_URL}/event/add`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: eventData,
    withCredentials: true,
  });
};

export const fetchEvents = async (): Promise<IEventData[]> => {
  const response = await axios({
    method: 'get',
    url: `${BACKEND_URL}/event/getAll`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true,
  })
  return response.data;
};