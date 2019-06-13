class Cart {
  id: string
  name: string
  count: number
  date: string

  constructor(id: string, name: string, count: number, date: string) {
    this.id = id
    this.name = name
    this.count = count
    this.date = date
  }
}

class CartList {
  cartList: Array<Cart>

  public add(cart: Cart) {
    this.cartList.push(cart)
  }
}

export default CartList
