import { USER_DETAIL } from "../constants/actionType"

export const detail = (username: string) => {
  return {
    type: USER_DETAIL,
    username
  }
}
