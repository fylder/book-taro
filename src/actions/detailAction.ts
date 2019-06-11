import { BOOK_DETAIL } from "../constants/detailConstants";

export const detail = id => {
  return {
    type: BOOK_DETAIL,
    id
  };
};
