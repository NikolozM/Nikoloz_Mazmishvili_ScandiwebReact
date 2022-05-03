import React, { Component } from "react";
import Product from "./Product";

class Products extends Component {
  render() {
    const { products, currencyIndex} = this.props;
    return (
      <div className="cards-list">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            currencyIndex={currencyIndex}
          />
        ))}
      </div>
    );
  }
}
export default Products;
