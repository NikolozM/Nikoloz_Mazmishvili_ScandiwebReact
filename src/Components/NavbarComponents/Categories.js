import React, { Component } from "react";
import Category from "./Category";

class Categories extends Component {
  render() {
    const {
      categories,
      chooseCategory,
      selectedCategory,
      selectCategory,
    } = this.props;
    return (
      <div className='flex'>
        {categories.map((category) => {
          return (
            <Category
              key={category.name}
              category={category}
              chooseCategory={chooseCategory}
              name={category.name}
              selectedCategory={selectedCategory}
              selectCategory={selectCategory}
            />
          );
        })}
      </div>
    );
  }
}
export default Categories;
