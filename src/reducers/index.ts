import { combineReducers } from "redux"
import counter from "./counter"
import user from "./userReducer"
import {detail.load} from "./detailReducer"

export default combineReducers({
  counter,
  user,
  detail,
  load
})
