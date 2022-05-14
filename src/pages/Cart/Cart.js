import React, { Component } from "react";
import CartSingleItem from "../../Components/CartComponents/cartSingleItem";

class Cart extends Component {
  render() {
    const {
      cartItem,
      quantity,
      currencyIndex,
      decreaseQuantity,
      increaseQuantity,
      deleteItem,
    } = this.props;
    let total = 0;
    let symbol;
    if (cartItem.length > 0) {
      return (
        <div>
          <div>
            <h1 className="renderCartName">CART</h1>
          </div>

          <div style={{ padding: "0px 100px 0px 100px" }}>
            {cartItem.map(
              (item) => (
                (total += item.price[0][currencyIndex] * item.count),
                (symbol = item.symbol[0][currencyIndex]),
                (
                  <CartSingleItem
                    key={item.individualId}
                    item={item}
                    currencyIndex={currencyIndex}
                    cartItem={cartItem}
                    decreaseQuantity={decreaseQuantity}
                    increaseQuantity={increaseQuantity}
                    deleteItem={deleteItem}
                  />
                )
              )
            )}
          </div>

          <div
            style={{ padding: "0px 100px 0px 100px", marginBottom: "258px" }}>
            <h3>Qty:{quantity}</h3>
            <h3>
              Total: {symbol} {Math.floor(total)}{" "}
            </h3>
          </div>
        </div>
      );
    } else {
      return <h1 className="renderCartName">CART IS EMPTY</h1>;
    }
  }
}
export default Cart;