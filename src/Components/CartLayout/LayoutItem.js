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
      <div className='layout-item-container'>
        <div>
          <div className='item-name'>
            <p>{item.name}</p>
            <p>{item.bottomname}</p>
          </div>
          <div className='symbol-price'>
            <p>
              <span>
                {item.symbol
                  ? item.symbol[0][currencyIndex]
                  : null}
              </span>
            </p>
            <p>
              <span>
                {item.symbol
                  ? item.price[0][currencyIndex]
                  : null}
              </span>
            </p>
          </div>

          <div>
            {item.attributes?.map((prev) => {
              return (
                <ul key={prev.id}>
                  <h4 className='attributeName'>
                    {prev.name}{" "}
                    {prev.name ? <span>:</span> : null}
                  </h4>
                  <div className='layout-attributes'>
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
                                    transform: "scale(1.7)",
                                    margin: "5px",
                                    boxSizing: "border-box",
                                    border:
                                      "1px double white",
                                    outline:
                                      "1px solid #5ECE7B",
                                  }
                                : {
                                    backgroundColor:
                                      att.displayValue,
                                    transform: "scale(1.5)",
                                    margin: "5px",
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

        <div className='increase-decrease-button'>
          <div
            className='increase-button'
            onClick={() => {
              increaseQuantity();
              item.count = item.count + 1;
            }}
          >
            <p>+</p>
          </div>

          <div className='count-button'>
            <h1>{item.count}</h1>
          </div>

          <div
            className='decrease-button'
            onClick={() => {
              decreaseQuantity();
              item.count = item.count - 1;
              deleteItem(item);
            }}
          >
            <p>-</p>
          </div>
        </div>

        <div>
          <img
            className='cart-item-img'
            src={item.cartImg}
            alt=''
          ></img>
        </div>
      </div>
    );
  }
}

export default LayoutItem;
