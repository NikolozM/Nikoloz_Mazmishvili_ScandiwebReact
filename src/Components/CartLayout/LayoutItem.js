import React, { Component } from "react";
import RenderAttr from "../RenderAttr";
import "./CartLayout.css";

class LayoutItem extends Component {
  render() {
    const {
      item,
      currencyIndex,
      increaseQuantity,
      decreaseQuantity,
      deleteItem,
    } = this.props;
    return (
      <div className="layout-item-container">
        <div>
          <div className="item-name">
            <p>{item.name}</p>
            <p>{item.bottomname}</p>
          </div>
          <div className="symbol-price">
            <p>
              <span>{item.symbol ? item.symbol[0][currencyIndex] : null}</span>
            </p>
            <p>
              <span>{item.symbol ? item.price[0][currencyIndex] : null}</span>
            </p>
          </div>

          <div>
            {item?.cartAttributes?.map((item) => {
              return (
                <ul
                  key={item.name}
                  style={{ listStyle: "none", paddingLeft: "0px" }}>
                  <h5
                    style={{
                      marginTop: "0",
                      fontFamily: "Raleway",
                      fontSize: "14px",
                      fontWeight: "400 regular",
                    }}>
                    {item.name}
                  </h5>

                  <li
                    style={
                      item.name === "Color"
                        ? {
                            backgroundColor: item.displayValue,
                            width: "16px",
                            height: "16px",
                            marginTop: "-10px",
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
                      <p
                        style={{
                          fontFamily: "Roboto",
                          display: "inline",
                          textAlign: "center",
                          padding: "5px 8px 5px 8px",
                          border: "1px solid black",
                        }}>
                        {RenderAttr(item)}
                      </p>
                    )}
                  </li>
                </ul>
              );
            })}
          </div>
        </div>

        <div className="increase-decrease-button">
          <div
            className="increase-button"
            onClick={() => {
              increaseQuantity();
              item.count = item.count + 1;
            }}>
            <p>+</p>
          </div>

          <div className="count-button">
            <h1>{item.count}</h1>
          </div>

          <div
            className="decrease-button"
            onClick={() => {
              decreaseQuantity();
              item.count = item.count - 1;
              deleteItem(item);
            }}>
            <p>-</p>
          </div>
        </div>

        <div style={{ paddingLeft: "8px" }}>
          <img className="cart-item-img" src={item.cartImg} alt=""></img>
        </div>
      </div>
    );
  }
}

export default LayoutItem;
