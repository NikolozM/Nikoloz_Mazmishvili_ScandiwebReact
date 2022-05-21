import React, { Component } from "react";
import { gql } from "@apollo/client";
import Categories from "../Components/NavbarComponents/Categories";
import Currencies from "../Components/NavbarComponents/Currencies";
import logo from "../assets/a-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import CartLayout from "../Components/CartLayout/CartLayout";
import { client } from "../index";
import { getCategory } from "./.././GraphQL/Queries";

class Navbar extends Component {
  state = {
    categories: [],
    arrow: faCaretDown,
    currencies: [],
  };

  getCategories = () => {
    client
      .query({
        query: gql`
          ${getCategory()}
        `,
      })
      .then((res) => {
        this.setState({
          categories: res?.data?.categories,
          currencies: res?.data?.currencies?.map((prev) => (
            <Currencies
              symbol={prev.symbol}
              label={prev.label}
              changeCurrency={this.props.changeCurrency}
              changeArrow={this.changeArrow}
            />
          )),
        });
      });
  };

  changeArrow = () => {
    if (this.state.arrow === faCaretDown) {
      this.setState({
        arrow: faCaretUp,
      });
    } else if (this.state.arrow === faCaretUp) {
      this.setState({
        arrow: faCaretDown,
      });
    }
  };

  componentDidMount() {
    this.getCategories();
    document.addEventListener(
      "mousedown",
      this.closeCurrencyOverlay
    );
    document.addEventListener(
      "mousedown",
      this.closeCartOverlay
    );
  }
  componentWillUnmount() {
    document.removeEventListener(
      "mousedown",
      this.closeCurrencyOverlay
    );
    document.removeEventListener(
      "mousedown",
      this.closeCartOverlay
    );
  }

  wrapperRef = React.createRef();
  myRef = React.createRef();
  cartLayoutRef = React.createRef();
  currencyRef = React.createRef();

  closeCurrencyOverlay = (event) => {
    if (
      !this.wrapperRef.current.contains(event.target) &&
      !this.myRef.current.contains(event.target) &&
      !this.currencyRef.current.contains(event.target) &&
      !this.cartLayoutRef.current.contains(event.target)
    ) {
      this.setState({
        arrow: faCaretDown,
      });
    }
  };

  closeCartOverlay = (event) => {
    const { closeCartLayout } = this.props;
    if (
      !this.wrapperRef.current.contains(event.target) &&
      !this.myRef.current.contains(event.target) &&
      !this.currencyRef.current.contains(event.target) &&
      !this.cartLayoutRef.current.contains(event.target)
    ) {
      closeCartLayout();
    }
  };

  render() {
    const {
      chooseCategory,
      currencySign,
      cartItem,
      quantity,
      currencyIndex,
      increaseQuantity,
      decreaseQuantity,
      deleteItem,
      getHeight,
      showCart,
      openOrCloseCartLayout,
    } = this.props;
    const { categories, arrow, currencies } = this.state;
    const {
      changeArrow,
      wrapperRef,
      myRef,
      currencyRef,
      cartLayoutRef,
    } = this;
    return (
      <div className='relative'>
        <div className='flex spaceBetween navBarHeight'>
          <div>
            <Categories
              categories={categories}
              chooseCategory={chooseCategory}
            />
          </div>

          <div className='logo'>
            <img src={logo} alt='' />
          </div>

          <div className='nav-container1'>
            <div className='nav-container2'>
              <FontAwesomeIcon
                className='currency-icon'
                icon={currencySign}
              />
              <div
                ref={wrapperRef}
                onClick={
                  showCart === false ? changeArrow : null
                }
              >
                <FontAwesomeIcon
                  className='arrow-icon'
                  icon={arrow}
                />
              </div>
              <div
                ref={currencyRef}
                className={
                  arrow === faCaretDown
                    ? "surface-off"
                    : "currencies-on"
                }
              >
                {currencies}
              </div>
            </div>

            <div className='right-navbar'>
              <div ref={myRef}>
                <FontAwesomeIcon
                  onClick={
                    arrow === faCaretDown
                      ? () => {
                          openOrCloseCartLayout();
                          getHeight();
                        }
                      : null
                  }
                  icon={faShoppingCart}
                  className='shoppingcart-icon'
                />
              </div>
              <div
                ref={cartLayoutRef}
                className={
                  showCart ? "cart-layout" : "surface-off"
                }
              >
                <CartLayout
                  cartItem={cartItem}
                  quantity={quantity}
                  currencyIndex={currencyIndex}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  deleteItem={deleteItem}
                />
              </div>
              <div className='qty-icon'>
                <div className='quantity-icon'>
                  <span>{quantity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
