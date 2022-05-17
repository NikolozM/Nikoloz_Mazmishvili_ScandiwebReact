import React, { Component } from "react";
import RenderAttr from "../RenderAttr";
import VectorRight from "../../assets/VectorRight.png";
import VectorLeft from "../../assets/VectorLeft.png";
import "../.././pages/Cart/Cart.css";
class CartSingleItem extends Component {
  state = {
    imageIndex: 0,
  };
  render() {
    const {
      item,
      currencyIndex,
      decreaseQuantity,
      increaseQuantity,
      deleteItem,
    } = this.props;
    const { imageIndex } = this.state;
    return (
      <div className="container">
        <div>
          <h3 className="name">{item.name}</h3>
          <h3 className="bottomName">{item.bottomname}</h3>

          <h3 className="symbol">
            <span>{item.symbol[0][currencyIndex]}</span>
          </h3>

          <h3 className="price">
            <span>{item.price[0][currencyIndex]}</span>
          </h3>

          <div>
            {item.cartAttributes.map((item) => {
              return (
                <ul key={item.name} className="ul">
                  <h4 className="attributeName">{item.name}</h4>

                  <li
                    style={
                      item.name === "Color"
                        ? {
                            backgroundColor: item.displayValue,
                            width: "32px",
                            height: "32px",
                            marginTop: "-17px",
                            border: "1px solid black",
                          }
                        : null
                    }>
                    {item.name === "Color" ? (
                      <p
                        style={{
                          opacity: "0",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                        .
                      </p>
                    ) : (
                      <h4 className="cart--attribute--name">
                        {RenderAttr(item)}
                      </h4>
                    )}
                  </li>
                </ul>
              );
            })}
          </div>
        </div>

        <div
          onClick={() => {
            increaseQuantity();
            item.count = item.count + 1;
          }}
          className="countIncreaseButton">
          <h2>+</h2>
        </div>
        <div>
          <h1 className="count">{item.count}</h1>
        </div>

        <div
          onClick={() => {
            decreaseQuantity();
            item.count = item.count - 1;
            deleteItem(item);
          }}
          className="countDecreaseButton">
          <h2>-</h2>
        </div>

        <div>
          <img
            className="cart--image"
            src={item.gallery[imageIndex]}
            alt=""></img>

          <div style ={{display: item.gallery.length > 1 ? "block" : "none"}}
            onClick={() =>
              imageIndex > 0
                ? this.setState({
                    imageIndex: imageIndex - 1,
                  })
                : null
            }
            className="vectorLeft">
            <img style={{ padding: "10px",display: "block" }} src={VectorLeft} alt="" />
          </div>

          <div style ={{display: item.gallery.length > 1 ? "block" : "none"}}
            onClick={() =>
              imageIndex < item.gallery.length - 1
                ? this.setState({
                    imageIndex: imageIndex + 1,
                  })
                : null
            }
            className="vectorRight">
            <img style={{ padding: "10px" , display: "block" }} src={VectorRight} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default CartSingleItem;
