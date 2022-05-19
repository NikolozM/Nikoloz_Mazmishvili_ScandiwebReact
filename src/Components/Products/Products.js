import React, { Component } from "react";
import Product from "./Product";

class Products extends Component {
  render() {
    const {
      products,
      currencyIndex,
      addItemCart,
      cartItem,
      checkSameItem,
      chooseSameItem,
    } = this.props;
    return (
      <div className='cards-list'>
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            currencyIndex={currencyIndex}
            addItemCart={addItemCart}
            cartItem={cartItem}
            checkSameItem={checkSameItem}
            chooseSameItem={chooseSameItem}
          />
        ))}
      </div>
    );
  }
}
export default Products;
