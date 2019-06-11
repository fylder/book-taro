import { USER_DETAIL } from "../constants/userConstants";

const INITIAL_STATE = {
  num: 0
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_DETAIL:
      return {
        ...state,
        username: action.username
      };
    default:
      return state;
  }
}
