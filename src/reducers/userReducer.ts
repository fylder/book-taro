import { USER_DETAIL } from "../constants/actionType"

export default function user(state = {}, action) {
  switch (action.type) {
    case USER_DETAIL:
      return {
        ...state,
        username: action.username
      }
    default:
      return state
  }
}
