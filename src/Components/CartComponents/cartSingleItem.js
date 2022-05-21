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
      <div className='container'>
        <div>
          <h3 className='name'>{item.name}</h3>
          <h3 className='bottomName'>{item.bottomname}</h3>

          <h3 className='symbol'>
            <span>{item.symbol[0][currencyIndex]}</span>
          </h3>

          <h3 className='price'>
            <span>{item.price[0][currencyIndex]}</span>
          </h3>

          <div>
            {item.attributes?.map((prev) => {
              return (
                <ul key={prev.id}>
                  <h4 className='attributeName'>
                    {prev.name}{" "}
                    {prev.name ? <span>:</span> : null}
                  </h4>
                  <div className='attribute-container'>
                    {prev.items.map((att) => {
                      const checked =
                        item.cartAttributes.find(
                          (att) => att.name === prev.name
                        );
                      return (
                        <li
                          key={att.id}
                          style={
                            prev.name === "Color"
                              ? checked?.displayValue ===
                                att.displayValue
                                ? {
                                    backgroundColor:
                                      att.displayValue,
                                    transform: "scale(1.3)",
                                    boxSizing: "border-box",
                                    border:
                                      "1px double white",
                                    outline:
                                      "1px solid #5ECE7B",
                                  }
                                : {
                                    backgroundColor:
                                      att.displayValue,
                                  }
                              : checked?.displayValue ===
                                att.displayValue
                              ? {
                                  backgroundColor: "black",
                                  color: "white",
                                }
                              : {
                                  backgroundColor: "white",
                                  color: "black",
                                }
                          }
                        >
                          {prev.name === "Color" ? (
                            <div></div>
                          ) : (
                            <span>{RenderAttr(att)}</span>
                          )}
                        </li>
                      );
                    })}
                  </div>
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
          className='countIncreaseButton'
        >
          <h2>+</h2>
        </div>
        <div>
          <h1 className='count'>{item.count}</h1>
        </div>

        <div
          onClick={() => {
            decreaseQuantity();
            item.count = item.count - 1;
            deleteItem(item);
          }}
          className='countDecreaseButton'
        >
          <h2>-</h2>
        </div>

        <div>
          <img
            className='cart--image'
            src={item.gallery[imageIndex]}
            alt=''
          ></img>

          <div
            className={
              item.gallery.length > 1
                ? "vectorLeft"
                : "display-none"
            }
            onClick={() =>
              imageIndex > 0
                ? this.setState({
                    imageIndex: imageIndex - 1,
                  })
                : null
            }
          >
            <img src={VectorLeft} alt='' />
          </div>

          <div
            className={
              item.gallery.length > 1
                ? "vectorRight"
                : "display-none"
            }
            onClick={() =>
              imageIndex < item.gallery.length - 1
                ? this.setState({
                    imageIndex: imageIndex + 1,
                  })
                : null
            }
          >
            <img src={VectorRight} alt='' />
          </div>
        </div>
      </div>
    );
  }
}

export default CartSingleItem;
