import React, { Component } from "react";
import { Link } from "react-router-dom";

class Category extends Component {
  render() {
    const { chooseCategory, name, category } = this.props;
    return (
      <section className="navbar">
        <Link className="text-decoration" to={"/"}>
          <p onClick={() => chooseCategory(name)}>
            {category.name.toUpperCase()}
          </p>
        </Link>
      </section>
    );
  }
}
export default Category;
