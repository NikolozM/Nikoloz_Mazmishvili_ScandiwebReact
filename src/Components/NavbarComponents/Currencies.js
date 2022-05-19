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
        <span style={{ paddingRight: "5px" }}>
          {symbol}
        </span>
        {label}
      </div>
    );
  }
}
export default Currencies;
