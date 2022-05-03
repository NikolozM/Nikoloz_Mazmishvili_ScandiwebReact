import React, { Component } from "react";
import RenderAttr from "../RenderAttr";

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
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 0.5fr 3fr",
          marginBottom: "40px",
        }}>
        <div>
          <div style={{ marginBottom: "4px" }}>
            <p
              style={{
                fontFamily: "Raleway",
                fontSize: "16px",
                fontWeight: "300 Light",
                margin: "0px",
              }}>
              {item.name}
            </p>
            <p
              style={{
                fontFamily: "Raleway",
                fontSize: "16px",
                fontWeight: "300 Light",
                margin: "0px",
              }}>
              {item.bottomname}
            </p>
          </div>
          <div>
            <p
              style={{
                fontFamily: "Raleway",
                fontSize: "16px",
                fontWeight: "700",
                display: "inline",
                margin: "0px",
              }}>
              <span>{item.symbol ? item.symbol[0][currencyIndex] : null}</span>
            </p>
            <p
              style={{
                fontFamily: "Raleway",
                fontSize: "16px",
                fontWeight: "700",
                display: "inline",
                margin: "0px",
              }}>
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
          <div
            style={{
              border: "1px solid #1D1F22",
              marginTop: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              increaseQuantity();
              item.count = item.count + 1;
            }}>
            <p
              style={{
                display: "inline",
                padding: "2px 8px 3px 8px",
                alignItems: "center",
              }}>
              +
            </p>
          </div>

          <div style={{}}>
            <h1
              style={{
                fontSize: "16px",
                fontFamily: "Raleway",
                transform: "translate(+30%)",
              }}>
              {item.count}
            </h1>
          </div>

          <div
            style={{
              border: "1px solid #1D1F22",
              marginBottom: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              decreaseQuantity();
              item.count = item.count - 1;
              deleteItem(item);
            }}>
            <p style={{ display: "inline", padding: "10px" }}>-</p>
          </div>
        </div>

        <div style={{ paddingLeft: "8px" }}>
          <img
            style={{ height: "190px", width: "100%", objectFit: "contain" }}
            src={item.cartImg}></img>
        </div>
      </div>
    );
  }
}

export default LayoutItem;
