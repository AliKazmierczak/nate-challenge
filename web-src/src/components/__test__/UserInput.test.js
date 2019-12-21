import React from "react";
import ReactDOM from "react-dom";
import UserInput from "../UserInput"

it("renders the form without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<UserInput />, div)
})