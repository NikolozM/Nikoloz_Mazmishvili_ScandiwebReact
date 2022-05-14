import React, { Component } from "react";
import { Link } from "react-router-dom";

class Product extends Component {
  render() {
    const { product, currencyIndex } = this.props;
    return (
      <div className="card">
        <Link style={{ textDecoration: 'none' }} to={`/PDP/${product.id}`}>
        {product.inStock ? (
            <img className="card--image" src={product.gallery[0]}></img>
        ) : (
          <img className="outStock--card--image" src={product.gallery[0]}></img>
        )}  

        {product.inStock ? null : (
          <h1 className="outStock--card--txt"> OUT OF STOCK </h1>
        )}

        <h3 className={product.inStock ? "fontSize" : "outStock--card--id--price"}>{product.brand}</h3>

        <h3
          className={
            product.inStock ? "fontSize" : "outStock--card--id--price"
          }>
          {product.name}
        </h3>

        <span
          className={
            product.inStock ? "fontSize" : "outStock--card--id--price"
          }>
          {product.prices[currencyIndex].currency.symbol}{" "}
          {product.prices[currencyIndex].amount}
        </span>
        </Link>
      </div>
      
    );
  }
}

export default Product;
