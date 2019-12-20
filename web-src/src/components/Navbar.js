import React from "react";
import calculator from "./calculator.png";
import Navbar from "react-bootstrap/Navbar";

class TopBar extends React.Component {
  render() {
    return (
      <Navbar className="navbar navbar-dark bg-nav fixed-top">
        <a className="navbar-brand" href="https://www.nate.tech/">
          <img
            src={calculator}
            width="30"
            height="30"
            className="d-inline-block align-left mr-2"
            alt=""
          />
          Engineering challenge for nate
        </a>
      </Navbar>
    );
  }
}

export default TopBar;
