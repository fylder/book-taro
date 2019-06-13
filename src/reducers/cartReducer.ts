import {
  SHOPPING_CART_SELECT,
  SHOPPING_CART_SAVE
} from "../constants/actionType"

/**
 * 一个function对应一个action
 * @param state
 * @param action
 */
export default function cart(state = {}, action) {
  switch (action.type) {
    case SHOPPING_CART_SELECT:
      return {
        ...state,
        cart: action.cart
      }
    case SHOPPING_CART_SAVE:
      return {
        ...state,
        cart: action.cart
      }
    default:
      return state
  }
}
