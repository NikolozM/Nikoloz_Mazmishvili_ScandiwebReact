import Products from "../../Components/Products/Products";
import React, { Component } from "react";
import { getProduct } from "../../GraphQL/Queries";
import { client } from "../../index";
import { gql } from "@apollo/client";

class PLP extends Component {
  state = {
    products: [],
  };

  // fetch products from api depending on category
  getProducts = () => {
    client
      .query({
        query: gql`
          ${getProduct(this.props.category)}
        `,
      })
      .then((res) => {
        this.setState({
          products: res?.data?.category?.products,
        });
      });
  };

  componentDidMount() {
    this.getProducts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.category !== this.props.category) {
      this.getProducts();
    }
  }

  render() {
    const {
      currencyIndex,
      renderCategoryName,
      addItemCart,
      cartItem,
      checkSameItem,
      chooseSameItem,
    } = this.props;
    const { products } = this.state;
    return (
      <div>
        <h1 className='renderCategoryName'>
          {renderCategoryName}
        </h1>
        <Products
          products={products}
          currencyIndex={currencyIndex}
          addItemCart={addItemCart}
          cartItem={cartItem}
          checkSameItem={checkSameItem}
          chooseSameItem={chooseSameItem}
        />
      </div>
    );
  }
}
export default PLP;
