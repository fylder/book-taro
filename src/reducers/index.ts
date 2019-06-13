import { combineReducers } from "redux"
import user from "./userReducer"
import { detail, load } from "./detailReducer"
import cart from "./cartReducer"

export default combineReducers({
  user,
  detail,
  load,
  cart
})
