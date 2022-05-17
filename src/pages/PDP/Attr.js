import React, { Component } from "react";
import RenderAttr from "../../Components/RenderAttr";

class Attr extends Component {

    render() {
    const { prev , item } = this.props;
      return (
          <div>
        {prev.name === "Color" ? <div></div> : 
            <span style={{fontFamily:"Roboto"}} >
              {RenderAttr(item)}</span>
        }
        </div>
      );
  }
}
  export default Attr;