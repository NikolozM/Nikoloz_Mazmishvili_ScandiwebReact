import Products from "../../Components/Products/Products";
import React, { Component } from "react";

class PLP extends Component {
  render() {
    const { products, currencyIndex, renderCategoryName } =
      this.props;

    return (
      <div>
        <h1 className="renderCategoryName">{renderCategoryName}</h1>
        <Products
          products={products}
          currencyIndex={currencyIndex}
        />
      </div>
    );
  }
}
export default PLP;
