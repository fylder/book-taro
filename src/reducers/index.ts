import { combineReducers } from "redux"
import user from "./userReducer"
import { detail, load } from "./detailReducer"

export default combineReducers({
  user,
  detail,
  load
})
