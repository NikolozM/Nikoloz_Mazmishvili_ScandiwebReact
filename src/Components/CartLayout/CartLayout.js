import React, { Component } from "react";
import LayoutItem from "./LayoutItem";
import { Link } from "react-router-dom";
import "./CartLayout.css";

class CartLayout extends Component {
  render() {
    const {
      cartItem,
      quantity,
      currencyIndex,
      increaseQuantity,
      decreaseQuantity,
      deleteItem,
    } = this.props;
    let total = 0;
    let symbol;
    if (cartItem.length > 0) {
      return (
        <div className='CartLayoutContainer'>
          <div className='myBagItems'>
            {quantity > 1 ? (
              <p>My bag, {quantity} items</p>
            ) : (
              <p>My bag, {quantity} item</p>
            )}
          </div>

          <div className='scrollBar'>
            {cartItem.map(
              (item) => (
                // eslint-disable-next-line no-sequences
                (total +=
                  item.price[0][currencyIndex] *
                  // eslint-disable-next-line no-sequences
                  item.count),
                (symbol = item.symbol[0][currencyIndex]),
                (
                  <LayoutItem
                    key={item.individualId}
                    item={item}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    currencyIndex={currencyIndex}
                    deleteItem={deleteItem}
                  />
                )
              )
            )}
          </div>
          <div className='total'>
            <span>Total</span>
            <span>
              {symbol} {Math.floor(total)}
            </span>
          </div>

          {/* vievBag viewBagButton*/}

          <div className='button-container'>
            <Link to={"/Cart"}>
              {" "}
              <button className='bag-button'>
                VIEW BAG
              </button>
            </Link>
            <button className="checkout-button">CHECK OUT</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className='emptyCart'>
          <h2>CART IS EMTPY</h2>
        </div>
      );
    }
  }
}
export default CartLayout;
