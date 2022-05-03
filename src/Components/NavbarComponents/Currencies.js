import React, { Component } from "react";

class Currencies extends Component {
  render() {
    const { changeCurrency, label, symbol } = this.props;
    return (
      <div onClick={() => changeCurrency(label)}>
        <span style={{ paddingRight: "5px" }}>{symbol}</span>
        {label}
      </div>
    );
  }
}
export default Currencies;
