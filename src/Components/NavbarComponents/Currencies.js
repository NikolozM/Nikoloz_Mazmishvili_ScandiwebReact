import React, { Component } from "react";

class Currencies extends Component {
  render() {
    const { changeCurrency, label, symbol, changeArrow } =
      this.props;
    return (
      <div
        className='hover'
        onClick={() => {
          changeCurrency(label);
          changeArrow();
        }}
      >
        <span>{symbol}</span>
        {label}
      </div>
    );
  }
}
export default Currencies;
