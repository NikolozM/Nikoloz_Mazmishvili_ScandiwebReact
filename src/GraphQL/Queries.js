import { gql } from "@apollo/client";

export const getProduct = (category) => {
    return gql`
    query{
      category(input: {title: "${category}"}){
        products {
          id
          name
          inStock
          category
          gallery
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
    }
    `;
};




export const getIndividualProduct = (id) => {
    return gql`
    query{
      product(id: "${id}"){
        id,
        name,
        inStock,
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
    `;
};


export const getCategory = () => {
    return gql`
    query {
      categories {
        name
      }
      currencies {
        label
        symbol
      }
    }
  `;
};