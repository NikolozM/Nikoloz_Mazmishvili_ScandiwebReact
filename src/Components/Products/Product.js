import React, { Component } from "react";
import { Link } from "react-router-dom";
import Surface from "../../assets/Surface.png";
import Vector from "../../assets/Vector.png";

class Product extends Component {
  state = {
    cartIcon: false,
  };

  render() {
    const {
      product,
      currencyIndex,
      addItemCart,
      cartItem,
      checkSameItem,
      chooseSameItem,
    } = this.props;

    let cartImg = product.gallery[0];
    let gallery = [...product.gallery];
    let name = product?.name?.split(" ", 1);
    let bottomname = product?.name?.substr(
      product.name.indexOf(" ") + 1
    );
    let symbol = [];
    let price = [];
    let cartAttributes = [];
    let attributes = [...product.attributes];

    if (product.attributes.length > 0) {
      for (let i = 0; i < product.attributes.length; i++) {
        let attToAdd = {
          name: product.attributes[i].name,
          displayValue:
            product.attributes[i].items[0].displayValue,
        };
        cartAttributes.push(attToAdd);
      }
    }

    symbol.push(
      product?.prices?.map((prev) => prev.currency.symbol)
    );
    price.push(product?.prices?.map((prev) => prev.amount));

    // we are using count and price to update total price
    let count = 1;
    // we are using individualId to remove individual items.
    let individualId = cartItem.length;

    let obj = {
      individualId,
      name,
      bottomname,
      cartImg,
      symbol,
      price,
      cartAttributes,
      count,
      gallery,
      attributes,
    };
    return (
      <div
        className='card'
        onMouseLeave={() =>
          this.setState({ cartIcon: false })
        }
        onMouseOver={() =>
          this.setState({ cartIcon: true })
        }
      >
        <Link className='link' to={`/PDP/${product.id}`}>
          {product.inStock ? (
            <img
              className='inStock--card--image'
              src={product.gallery[0]}
              alt=''
            ></img>
          ) : (
            <img
              className='outStock--card--image'
              src={product.gallery[0]}
              alt=''
            ></img>
          )}

          {product.inStock ? null : (
            <h1 className='outStock--card--txt'>
              {" "}
              OUT OF STOCK{" "}
            </h1>
          )}

          <div
            className={
              this.state.cartIcon && product.inStock
                ? "surface-on"
                : "surface-off"
            }
            onClick={(e) => {
              e.preventDefault();
              checkSameItem(obj)
                ? chooseSameItem(obj)
                : addItemCart(product, obj, cartAttributes);
            }}
          >
            <img src={Surface} alt=''></img>
            <img
              className='vector-image'
              src={Vector}
              alt=''
            ></img>
          </div>

          <h3
            className={
              product.inStock
                ? "fontSize"
                : "outStock--card--id--price"
            }
          >
            {product.brand}
          </h3>

          <h3
            className={
              product.inStock
                ? "fontSize"
                : "outStock--card--id--price"
            }
          >
            {product.name}
          </h3>

          <span
            className={
              product.inStock
                ? "fontSize"
                : "outStock--card--id--price"
            }
          >
            {product.prices[currencyIndex].currency.symbol}{" "}
            {product.prices[currencyIndex].amount}
          </span>
        </Link>
      </div>
    );
  }
}

export default Product;
