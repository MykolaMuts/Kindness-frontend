export const BACKEND_URL = "http://localhost:8080";

export enum SelectedPages {
  Home = "/home",
  Login = "/login",
  Event = "/createEvent",
  User = "/user",
  Registration = "/registration",
  Benefit = "/benefit",
  Contact = "/contact",
  About = "/aboutus",
  Admin = "/admin",
  Unauthorized = "/unauthorized",
}

export interface IUserData {
  eventList: IEventData[];
  id: number;
  profilePicUrl: string;
  username: string;
  password: string;
  email: string;
  role: string[];
  description: string;
  serviceCategory: string[];
  city: string;
}

export interface IUserServiceData {
  description: string;
  serviceCategory: string[];
  city: string;
}

export interface IRegistrationForm {
  username: string;
  email: string;
  password: string;
}

export interface IEventRequestData {
  authorId: number;
  title: string;
  description: string;
  city: string;
  date: string;
}

export interface IEventData {
  id: number;
  title: string;
  description: string;
  city: string;
  date: string;
  authorId: number;
  authorUsername: string;
}

export enum ScreenSize {
  Small ="(min-width: 860px)"
}

export enum Roles {
  Admin = "ADMIN",
  User = "USER",
}

export const categoriesList = [
  "PLUMBER",
  "ELECTRICIAN",
  "LANGUAGE_TUTOR",
  "MECHANIC",
  "CARPENTER",
  "HUSBAND_FOR_AN_HOUR",
  "HOUSEHOLD_APPLIANCES_INSTALLER",
  "OTHER",
];

export const citiesList = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"]; // Example cities
