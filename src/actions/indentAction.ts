import { INDENT_LIST } from "../constants/actionType"

export const query = (id: string) => {
  return {
    type: INDENT_LIST,
    id
  }
}
