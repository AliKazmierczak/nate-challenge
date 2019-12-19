import React from "react";

class Menu extends React.Component {
  render() {
    return (
      <div>
        <p>Let's start calculating!</p>
        <p>The sites we already calculated for you:</p>

        {this.props.searchHistory.map(historyElement => {
          return <p>{historyElement}</p>;
        })}
      </div>
    );
  }
}

export default Menu;
