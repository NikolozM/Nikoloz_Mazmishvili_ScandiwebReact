import React, { Component } from "react";
import PLP from "./pages/PLP/PLP";
import PDP from "./pages/PDP/PDP";
import Cart from "./pages/Cart/Cart";
import Navbar from "./pages/Navbar";
import { Routes, Route } from "react-router-dom";
import _ from "lodash";

import {
  faYenSign,
  faPoundSign,
  faAustralSign,
  faRubleSign,
} from "@fortawesome/free-solid-svg-icons";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  state = {
    category: "all",
    renderCategoryName: "ALL",
    currencyIndex: 0,
    currencySign: faDollarSign,
    quantity: 0,
    cartItem: [],
    // document height for apply background when cart layout is open
    height: document.documentElement.scrollHeight,
    showCart: false,
  };

  // onClick chooses category and renders items by category. This func goes by props to category
  chooseCategory = (name) => {
    this.setState({
      category: name,
      renderCategoryName: name.toUpperCase(),
    });
  };
  // increase item quantity by 1 onClick
  increaseQuantity = () => {
    this.setState({
      quantity: this.state.quantity + 1,
    });
  };
  // decrease item quantity by 1 onClick
  decreaseQuantity = () => {
    this.setState({
      quantity: this.state.quantity - 1,
    });
  };

  // Changes currency index and passing changed index to product by props
  changeCurrency = (label) => {
    if (label === "GBP") {
      this.setState({
        currencyIndex: 1,
        currencySign: faPoundSign,
      });
    } else if (label === "USD") {
      this.setState({
        currencyIndex: 0,
        currencySign: faDollarSign,
      });
    } else if (label === "AUD") {
      this.setState({
        currencyIndex: 2,
        currencySign: faAustralSign,
      });
    } else if (label === "JPY") {
      this.setState({
        currencyIndex: 3,
        currencySign: faYenSign,
      });
    } else if ((label = "RUB")) {
      this.setState({
        currencyIndex: 4,
        currencySign: faRubleSign,
      });
    }
  };

  // check if adding same item with same attributes

  checkSameItem = (obj) => {
    for (let i = 0; i < this.state.cartItem.length; i++) {
      if (
        _.isEqual(obj.name, this.state.cartItem[i].name) &&
        _.isEqual(
          obj.cartAttributes,
          this.state.cartItem[i].cartAttributes
        )
      ) {
        return true;
      }
    }
  };
  // if adding same item with same attributes, only quantity and item count increasing
  chooseSameItem = (obj) => {
    for (let i = 0; i < this.state.cartItem.length; i++) {
      if (
        _.isEqual(obj.name, this.state.cartItem[i].name) &&
        _.isEqual(
          obj.cartAttributes,
          this.state.cartItem[i].cartAttributes
        )
      ) {
        const items = [...this.state.cartItem];
        items[i].count = items[i].count + 1;
        this.setState({
          quantity: this.state.quantity + 1,
          cartItem: items,
        });
      }
    }
  };

  // always closes cartlayout when click is outside of element
  closeCartLayout = () => {
    this.setState({
      showCart: false,
    });
  };
  // onclick opens or closes cartlayout
  openOrCloseCartLayout = () => {
    this.setState({
      showCart: !this.state.showCart,
    });
  };

  // if product does not have attributes item adding without att choosing, but if it has , choosing att is mandatory.
  addItemCart = (product, obj, cartAttributes) => {
    if (
      // eslint-disable-next-line eqeqeq
      product?.attributes == false &&
      product?.inStock
    ) {
      this.setState({
        cartItem: [...this.state.cartItem, obj],
        quantity: this.state.quantity + 1,
      });
    } else if (
      product?.attributes?.length > 0 &&
      product?.attributes?.length ===
        cartAttributes.length &&
      product?.inStock
    ) {
      this.setState({
        cartItem: [...this.state.cartItem, obj],
        quantity: this.state.quantity + 1,
      });
    } else {
      this.setState({
        cartItem: [...this.state.cartItem],
        quantity: this.state.quantity,
      });
    }
  };

  // delete item from cart if item count = 0
  deleteItem = (item) => {
    const copyCartItem = [...this.state.cartItem];
    if (item.count === 0) {
      for (let i = 0; i < copyCartItem.length; i++) {
        if (
          item.individualId === copyCartItem[i].individualId
        ) {
          copyCartItem.splice(i, 1);
          this.setState({
            cartItem: copyCartItem,
          });
        }
      }
    }
  };

  // this fuction gets page height when you click cart button or change category.
  // with this height,  we are applying background when cart layout is open
  getHeight = () => {
    this.setState({
      height: document.documentElement.scrollHeight,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.category !== this.state.category) {
      this.getHeight();
    }
  }

  render() {
    const {
      renderCategoryName,
      currencyIndex,
      currencySign,
      quantity,
      cartItem,
      height,
      showCart,
      category,
    } = this.state;
    const {
      chooseCategory,
      changeCurrency,
      addItemCart,
      increaseQuantity,
      decreaseQuantity,
      deleteItem,
      checkSameItem,
      chooseSameItem,
      getHeight,
      closeCartLayout,
      openOrCloseCartLayout,
    } = this;
    return (
      <div>
        <div
          id='overlayBackground'
          style={{
            height: `${height}px`,
            display: showCart === true ? "block" : "none",
          }}
        ></div>
        <Navbar
          chooseCategory={chooseCategory}
          changeCurrency={changeCurrency}
          currencySign={currencySign}
          cartItem={cartItem}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          quantity={quantity}
          currencyIndex={currencyIndex}
          deleteItem={deleteItem}
          getHeight={getHeight}
          showCart={showCart}
          closeCartLayout={closeCartLayout}
          openOrCloseCartLayout={openOrCloseCartLayout}
        />
        <Routes>
          <Route
            path='/'
            element={
              <PLP
                currencyIndex={currencyIndex}
                renderCategoryName={renderCategoryName}
                addItemCart={addItemCart}
                cartItem={cartItem}
                checkSameItem={checkSameItem}
                chooseSameItem={chooseSameItem}
                category={category}
              />
            }
          />

          <Route
            path='/PDP/:id'
            element={
              <PDP
                currencyIndex={currencyIndex}
                cartItem={cartItem}
                addItemCart={addItemCart}
                checkSameItem={checkSameItem}
                chooseSameItem={chooseSameItem}
              />
            }
          />

          <Route
            path='/Cart'
            element={
              <Cart
                cartItem={cartItem}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                deleteItem={deleteItem}
                quantity={quantity}
                currencyIndex={currencyIndex}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default App;
