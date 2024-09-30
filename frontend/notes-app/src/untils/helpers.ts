import { options } from "./constants";

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
};

export const getInnital = (name: string): string => {
  if (!name) return "";
  let shortName = "";
  const words = name.split(" ");
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    shortName += words[i][0];
  }
  return shortName.toUpperCase();
};

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate;
};

export const getQueryUrl = (value: string) => {
  const queryParams = new URLSearchParams(value).toString().split("=")[0];
  return queryParams;
};
