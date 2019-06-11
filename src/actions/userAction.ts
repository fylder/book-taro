import { USER_DETAIL } from "../constants/userConstants";

export const detail = username => {
  return {
    type: USER_DETAIL,
    username
  };
};
