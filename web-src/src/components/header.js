import React from "react";
import calculator from "./calculator.png";

class Header extends React.Component {
  render() {
    return (
      <nav class="navbar navbar-dark bg-nav">
        <a class="navbar-brand" href="https://www.nate.tech/">
          <img
            src={calculator}
            width="30"
            height="30"
            class="d-inline-block align-left mr-2"
            alt=""
          />
          Engineering challenge for nate
        </a>
      </nav>
    );
  }
}

export default Header;
