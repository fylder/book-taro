import {
  SHOPPING_CART_SELECT,
  SHOPPING_CART_SAVE
} from "../constants/actionType"
import CartList from "./model/cart"

export const query = () => {
  return {
    type: SHOPPING_CART_SELECT,
    cart: [
      {
        id: 1,
        name: "黑森林草莓味",
        count: 1,
        date: ""
      },
      {
        id: 2,
        name: "黑森林草莓味",
        count: 1,
        date: ""
      }
    ]
  }
}

export const save = (cartList: CartList) => {
  return {
    type: SHOPPING_CART_SAVE,
    cart: cartList
  }
}
