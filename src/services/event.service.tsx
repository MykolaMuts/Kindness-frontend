import axios from "axios";
import {BACKEND_URL, IEventData} from "../App.constants.tsx";

export const addEvent = (eventData: IEventData) => {
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