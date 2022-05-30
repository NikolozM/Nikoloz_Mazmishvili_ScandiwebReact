import React, { Component } from "react";
import { Link } from "react-router-dom";

class Category extends Component {
  render() {
    const {
      chooseCategory,
      name,
      category,
      selectedCategory,
      selectCategory,
    } = this.props;
    return (
      <section className='navbar'>
        <Link className='text-decoration' to={"/"}>
          <p
            className={
              selectedCategory[0] === name
                ? "navbar-hover"
                : null
            }
            onClick={() => {
              chooseCategory(name);
              selectCategory(name);
            }}
          >
            {category.name.toUpperCase()}
          </p>
        </Link>
      </section>
    );
  }
}
export default Category;
