import React, { Component } from "react";
import RenderAttr from "../RenderAttr";
import VectorRight from "../../assets/VectorRight.png";
import VectorLeft from "../../assets/VectorLeft.png";
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
      <div
        style={{
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "2px solid #E5E5E5",
          borderTop: "2px solid #E5E5E5",
        }}>
        <div>
          <h3
            style={{
              fontFamily: "Raleway",
              fontSize: "30px",
              fontWeight: "600",
              marginTop: "24px",
              marginBottom: "16px",
            }}>
            {item.name}
          </h3>
          <h3
            style={{
              fontFamily: "Raleway",
              fontSize: "30px",
              fontWeight: "400",
              marginBottom: "20px",
            }}>
            {item.bottomname}
          </h3>

          <h3
            style={{
              fontFamily: "Raleway",
              fontSize: "24px",
              fontWeight: "700",
              marginBottom: "20px",
              display: "inline",
            }}>
            <span>{item.symbol[0][currencyIndex]}</span>
          </h3>

          <h3
            style={{
              fontFamily: "Raleway",
              fontSize: "24px",
              fontWeight: "700",
              marginBottom: "20px",
              display: "inline",
            }}>
            <span>{item.price[0][currencyIndex]}</span>
          </h3>

          <div style={{}}>
            {item.cartAttributes.map((item) => {
              return (
                <ul
                  key={item.name}
                  style={{ listStyle: "none", paddingLeft: "0px" }}>
                  <h4
                    style={{
                      fontFamily: "Raleway",
                      fontSize: "18px",
                      fontWeight: "700 bold",
                      marginBottom: "25px",
                    }}>
                    {item.name}
                  </h4>

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
          style={{
            position: "absolute",
            top: "24px",
            right: "20%",
            border: "1px solid #1D1F22",
            cursor: "pointer",
          }}>
          <h2
            style={{
              margin: "0",
              padding: "15px 15px 15px 15px",
              alignItems: "center",
            }}>
            +
          </h2>
        </div>
        <div>
          <h1
            style={{
              position: "absolute",
              top: "46%",
              right: "21%",
              transform: "translate(+0%, -50%)",
              fontSize: "24px",
              fontFamily: "Raleway",
            }}>
            {item.count}
          </h1>
        </div>

        <div
          onClick={() => {
            decreaseQuantity();
            item.count = item.count - 1;
            deleteItem(item);
          }}
          style={{
            position: "absolute",
            bottom: "24px",
            right: "20%",
            border: "1px solid #1D1F22",
            cursor: "pointer",
          }}>
          <h2
            style={{
              margin: "0",
              padding: "15px 17px 15px 17px",
              alignItems: "center",
            }}>
            -
          </h2>
        </div>

        <div>
          {/* <img className="cart--image" src={item.cartImg}></img> */}
          <img className="cart--image" src={item.gallery[imageIndex]}></img>

          <div
            onClick={() =>
              imageIndex > 0
                ? this.setState({
                    imageIndex: imageIndex - 1,
                  })
                : null
            }
            style={{
              position: "absolute",
              top: "80%",
              right: "6%",
              backgroundColor: "rgba(0, 0, 0, 0.73)",
            }}>
            <img style={{ padding: "10px" }} src={VectorLeft} />
          </div>

          <div
            onClick={() =>
              imageIndex < item.gallery.length - 1
                ? this.setState({
                    imageIndex: imageIndex + 1,
                  })
                : null
            }
            style={{
              position: "absolute",
              top: "80%",
              right: "2%",
              backgroundColor: "rgba(0, 0, 0, 0.73)",
            }}>
            <img style={{ padding: "10px" }} src={VectorRight} />
          </div>
        </div>
      </div>
    );
  }
}

export default CartSingleItem;
