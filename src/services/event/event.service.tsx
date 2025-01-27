import axios from "axios";
import { BACKEND_URL } from "../../App.constants.tsx";

export interface IEventData {
  title: string;
  description: string;
  location: string;
  date: string;
}

export const addEvent = (eventData: IEventData) => {
  return axios({
    method: 'post',
    url: `${BACKEND_URL}/event/add`,
    data: eventData,
    // withCredentials: true,
  });
};
