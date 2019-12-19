import React from "react";

class History extends React.Component {
  render() {
    return (
      <div>
        <p>History of broased sites:</p>

        {this.props.searchHistory.map((historyElement, index) => {
          return <p key={index}>{historyElement}</p>;
        })}
      </div>
    );
  }
}

export default History;
