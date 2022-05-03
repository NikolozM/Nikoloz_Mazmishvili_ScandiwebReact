import React, { Component } from "react";
import { gql } from "@apollo/client";
import RenderAttr from "../../Components/RenderAttr";
import { client } from "../../index";
import withRouter from "../../Components/withRouter";
class PDP extends Component {
  state = {
    mainImage: [],
    cartAttributes: [],
    product: {},
    gallery: [],
    id: this.props.router.params.id,
  };

  getProduct() {
    client
      .query({
        query: gql`
            query{
              product(id: "${this.state.id}"){
                id,
                name,
                gallery,
                description,
                attributes{
                  id
                  name
                  type
                  items{
                    displayValue
                    id
                  }
                }
                prices{
                  currency{
                    label
                    symbol
                  }
                  amount
                }
                brand
              }
            }
            `,
      })
      .then((res) => {
        this.setState({
          mainImage: res?.data?.product?.gallery[0],
          product: res?.data?.product,
          gallery: res?.data?.product?.gallery,
        });
      });
  }

  componentDidMount() {
    this.getProduct();
  }

  render() {
    console.log(this.state.product);
    const { currencyIndex, cartItem, addItemCart } = this.props;
    const { mainImage, cartAttributes, product, gallery } = this.state;

    // small images to render , push with onClick method to change mainImage state
    const images = [];
    for (let i = 0; i < gallery.length; i++) {
      images.push(
        <img
          key={i}
          src={gallery[i]}
          onClick={() => this.setState({ mainImage: gallery[i] })}
        />
      );
    }
    let description = product.description?.replace(
      new RegExp("<[^>]*>", "g"),
      ""
    );

    let name = product?.name?.split(" ", 1);
    let bottomname = product?.name?.substr(product.name.indexOf(" ") + 1);
    let cartImg = gallery[0];
    let symbol = [];
    let price = [];
    symbol.push(product?.prices?.map((prev) => prev.currency.symbol));
    price.push(product?.prices?.map((prev) => prev.amount));

    // we are using count and price to update total price
    let count = 1;
    // we are using individualId to remove individual items.
    let individualId = cartItem.length;

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
    };

    return (
      <div className="parent-cont">
        <div className="product-page-grid">
          <div className="product-pictures">
            <div className="more-pics">{images}</div>
            <div className="main-pic">
              <img src={mainImage} />
            </div>
          </div>

          <div className="product-description">
            <div>
              <h1 style={{ width: "70%", fontWeight: "600" }}>
                {name}
                <span></span>
              </h1>
              <h1
                style={{ width: "70%", fontWeight: "400", marginTop: "-15px" }}>
                {bottomname}
                <span></span>
              </h1>
            </div>

            {/* start attr render */}
            <div>
              {product?.attributes?.map((prev) => {
                return (
                  <ul key={prev.id}>
                    <h4
                      style={{
                        fontFamily: "Roboto",
                        textTransform: "uppercase",
                      }}>
                      {prev.name} {prev.name ? <span>:</span> : null}
                    </h4>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      {prev.items.map((item) => {
                        const modifyAttributes = [...cartAttributes];
                        return (
                          <li
                            key={item.id}
                            onClick={() => {
                              const sameItem = modifyAttributes.find(
                                (atr) => atr.name === prev.name
                              );
                              const attributesToAdd = {
                                name: prev.name,
                                displayValue: item.displayValue,
                              };
                              const sameItemIndex =
                                modifyAttributes.indexOf(sameItem);
                                
                              sameItem
                                ? modifyAttributes.splice(
                                    sameItemIndex,
                                    1,
                                    attributesToAdd
                                  )
                                : modifyAttributes.push(attributesToAdd);
                              this.setState({
                                cartAttributes: modifyAttributes,
                              });
                            }}
                            style={
                              prev.name === "Color"
                                ? { backgroundColor: item.id }
                                : null
                            }>
                            {prev.name === "Color" ? null : (
                              <span style={{ fontFamily: "Roboto" }}>
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

            <div
              style={{
                marginTop: "20px",
                marginBottom: "10px",
                fontFamily: "Roboto",
              }}>
              <strong>PRICE:</strong>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <span>
                <h2 style={{ display: "inline" }}>
                  {product.prices
                    ? product.prices[currencyIndex].currency.symbol
                    : null}
                </h2>
              </span>
              <span>
                <h2 style={{ display: "inline" }}>
                  {product.prices ? product.prices[currencyIndex].amount : null}
                </h2>
              </span>
            </div>

            <div style={{ marginBottom: "40px" }}>
              <button
                onClick={() => addItemCart(product, obj, cartAttributes)}
                className="add-to-cart-btn">
                ADD TO CART
              </button>
            </div>

            <h3 style={{ fontFamily: "Roboto", fontWeight: "400" }}>
              {description}
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PDP);
