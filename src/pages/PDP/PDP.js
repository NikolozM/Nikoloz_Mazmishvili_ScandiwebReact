import React, { Component } from "react";
import { gql } from "@apollo/client";
import { client } from "../../index";
import withRouter from "../../Components/withRouter";
import { getIndividualProduct } from "../.././GraphQL/Queries";
import RenderAttr from "../../Components/RenderAttr";

class PDP extends Component {
  state = {
    mainImage: [],
    cartAttributes: [],
    product: {},
    gallery: [],
    id: this.props.router.params.id,
    att: [],
    showFullDescription: false,
  };

  // fetching individual product from api depending on id

  getIndividualProduct = () => {
    client
      .query({
        query: gql`
          ${getIndividualProduct(this.state.id)}
        `,
      })
      .then((res) => {
        this.setState({
          mainImage: res?.data?.product?.gallery[0],
          product: res?.data?.product,
          gallery: res?.data?.product?.gallery,
          att: res?.data?.product.attributes,
        });
      });
  };

  componentDidMount() {
    this.getIndividualProduct();
  }

  render() {
    const {
      currencyIndex,
      cartItem,
      addItemCart,
      checkSameItem,
      chooseSameItem,
    } = this.props;

    const {
      mainImage,
      cartAttributes,
      product,
      gallery,
      att,
      showFullDescription,
    } = this.state;

    // small images to render , push with onClick method to change mainImage state
    const images = [];
    for (let i = 0; i < gallery.length; i++) {
      images.push(
        <img
          key={i}
          src={gallery[i]}
          onClick={() =>
            this.setState({
              mainImage: gallery[i],
            })
          }
          alt=''
        />
      );
    }
    let description = product.description?.replace(
      new RegExp("<[^>]*>", "g"),
      ""
    );

    let name = product?.name?.split(" ", 1);
    let bottomname = product?.name?.substr(
      product.name.indexOf(" ") + 1
    );
    let cartImg = gallery[0];
    let symbol = [];
    let price = [];
    symbol.push(
      product?.prices?.map((prev) => prev.currency.symbol)
    );
    price.push(product?.prices?.map((prev) => prev.amount));

    // we are using count and price to update total price
    let count = 1;
    // we are using individualId to remove individual items.
    let individualId = cartItem.length;

    const attributes = [...att];

    // with addItemCart function objet  ADD to Cart
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
      <div className='parent-cont'>
        <div className='product-page-grid'>
          <div className='product-pictures'>
            <div className='more-pics'>{images}</div>
            <div className='main-pic'>
              <img src={mainImage} alt='' />
            </div>
          </div>

          <div className='product-description'>
            <div>
              <h1 className='name'>
                {name}
                <span></span>
              </h1>
              <h1 className='bottom-name'>
                {bottomname}
                <span></span>
              </h1>
            </div>

            {/* start attr render */}
            <div>
              {product?.attributes?.map((prev) => {
                return (
                  <ul key={prev.id}>
                    <h4 className='attribute-name'>
                      {prev.name}{" "}
                      {prev.name ? <span>:</span> : null}
                    </h4>
                    <div className='attributes'>
                      {prev.items.map((item) => {
                        const modifyAttributes = [
                          ...cartAttributes,
                        ];
                        const attributesToAdd = {
                          name: prev.name,
                          displayValue: item.displayValue,
                        };
                        const checked =
                          modifyAttributes.find(
                            (att) => att.name === prev.name
                          );
                        return (
                          <li
                            key={item.id}
                            onClick={() => {
                              const sameItem =
                                modifyAttributes.find(
                                  (atr) =>
                                    atr.name === prev.name
                                );
                              const sameItemIndex =
                                modifyAttributes.indexOf(
                                  sameItem
                                );

                              sameItem
                                ? modifyAttributes.splice(
                                    sameItemIndex,
                                    1,
                                    attributesToAdd
                                  )
                                : modifyAttributes.push(
                                    attributesToAdd
                                  );
                              this.setState({
                                cartAttributes:
                                  modifyAttributes,
                              });
                            }}
                            style={
                              prev.name === "Color"
                                ? checked?.displayValue ===
                                  item.displayValue
                                  ? {
                                      backgroundColor:
                                        item.displayValue,
                                      transform:
                                        "scale(1.5)",
                                      boxSizing:
                                        "border-box",
                                      border:
                                        "1px double white",
                                      outline:
                                        "1px solid #5ECE7B",
                                    }
                                  : {
                                      backgroundColor:
                                        item.displayValue,
                                    }
                                : checked?.displayValue ===
                                  item.displayValue
                                ? {
                                    backgroundColor:
                                      "black",
                                    color: "white",
                                  }
                                : {
                                    backgroundColor:
                                      "white",
                                    color: "black",
                                  }
                            }
                          >
                            {prev.name === "Color" ? (
                              <div></div>
                            ) : (
                              <span className='roboto'>
                                {RenderAttr(item)}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </div>
                  </ul>
                );
              })}
            </div>
            {/* attr render END*/}

            <div className='price'>
              <strong>PRICE:</strong>
            </div>
            <div className='symbol-amount'>
              <span>
                <h2>
                  {product.prices
                    ? product.prices[currencyIndex].currency
                        .symbol
                    : null}
                </h2>
              </span>
              <span>
                <h2>
                  {product.prices
                    ? product.prices[currencyIndex].amount
                    : null}
                </h2>
              </span>
            </div>

            <div className='add-button'>
              <button
                onClick={() =>
                  checkSameItem(obj)
                    ? chooseSameItem(obj)
                    : addItemCart(
                        product,
                        obj,
                        cartAttributes
                      )
                }
                className={
                  product.inStock
                    ? "add-to-cart-btn"
                    : "outstock-button"
                }
              >
                {product.inStock
                  ? "ADD TO CART"
                  : "OUT OF STOCK"}
              </button>
            </div>

            <p className='description'>
              {showFullDescription
                ? String(description)
                : String(description).slice(0, 150)}
              {String(description).length > 150 ? (
                <span
                  className='more-less'
                  onClick={() =>
                    this.setState({
                      showFullDescription:
                        !this.state.showFullDescription,
                    })
                  }
                >
                  {showFullDescription ? (
                    <strong>[show less]</strong>
                  ) : (
                    <strong>[...more]</strong>
                  )}
                </span>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PDP);
