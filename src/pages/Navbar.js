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

class Navbar extends Component {
  state = {
    categories: [],
    arrow: faCaretDown,
    currencies: [],
    showCart: false,
  };

  getCategories() {
    client
      .query({
        query: gql`
          query {
            categories {
              name
            }
            currencies {
              label
              symbol
            }
          }
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
  }

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
    document.addEventListener("mousedown", this.closeCurrencyOverlay);
    document.addEventListener("mousedown", this.closeCartOverlay);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.closeCurrencyOverlay);
    document.removeEventListener("mousedown", this.closeCartOverlay);
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
    if (
      !this.wrapperRef.current.contains(event.target) &&
      !this.myRef.current.contains(event.target) &&
      !this.currencyRef.current.contains(event.target) &&
      !this.cartLayoutRef.current.contains(event.target)
    ) {
      this.setState({
        showCart: false,
      });
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
    } = this.props;
    const { categories, arrow, currencies, showCart } = this.state;
    const { changeArrow, wrapperRef, myRef, currencyRef, cartLayoutRef } = this;
    return (
      <div style={{ position: "relative" }}>
        <div className="flex spaceBetween navBarHeight">
          <div>
            <Categories
              categories={categories}
              chooseCategory={chooseCategory}
            />
          </div>

          <div style={{ margin: "auto" }}>
            <img className="logo" src={logo} />
          </div>

          <div
            style={{
              display: "flex",
              paddingRight: "150px",
              alignItems: "center",
            }}>
            <div style={{ display: "flex", paddingLeft: "100px" }}>
              <FontAwesomeIcon
                style={{ alignItems: "center" }}
                icon={currencySign}
              />
              <div
                ref={wrapperRef}
                onClick={showCart === false ? changeArrow : null}>
                <FontAwesomeIcon
                  style={{
                    padding: "5px",
                    alignItems: "end",
                    cursor: "pointer",
                  }}
                  icon={arrow}
                />
              </div>
              <div
                ref={currencyRef}
                className="Currencies"
                style={{
                  display: arrow === faCaretDown ? "none" : "flex",
                  cursor: "pointer",
                }}>
                {currencies}
              </div>
            </div>

            <div style={{ paddingLeft: "22px" }}>
              <div ref={myRef}>
                <FontAwesomeIcon
                  onClick={
                    arrow === faCaretDown
                      ? () =>
                          this.setState({
                            showCart: !this.state.showCart,
                          })
                      : null
                  }
                  icon={faShoppingCart}
                  style={{ alignItems: "start", cursor: "pointer" }}
                />
              </div>
              <div
                ref={cartLayoutRef}
                style={{
                  display: showCart ? "flex" : "none",
                  position: "absolute",
                  left: "70%",
                  top: "70px",
                  backgroundColor: "rgba(255,255,255,1)",
                  right: "1px",
                  zIndex: "1",
                  maxWidth: "325px",
                }}>
                <CartLayout
                  cartItem={cartItem}
                  quantity={quantity}
                  currencyIndex={currencyIndex}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  deleteItem={deleteItem}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "17px",
                  marginLeft: "8px",
                }}>
                <div
                  style={{
                    position: "relative",
                    width: "20px",
                    height: "20px",
                    display: "inline-block",
                    margin: "0",
                    borderRadius: "50%",
                    backgroundColor: "black",
                    color: "white",
                    fontSize: "0.9em",
                    textAlign: "center",
                  }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "50%",
                      transform: "translate(-50%,+5%)",
                      fontFamily: "Roboto",
                    }}>
                    {quantity}
                  </span>
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
