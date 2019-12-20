import React from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

class History extends React.Component {
  backToHistory = async function(link) {
    console.log(link.target.value);
    let statAgain = await axios.get("http://localhost:3000/word-count", {
      params: { url: link.target.value }
    });
    this.props.passOldUrlResults(statAgain);
  };

  render() {
    return (
      <div>
        <p>History of broased sites:</p>

        {this.props.searchHistory.map((historyElement, index) => {
          return (
            <Button
              variant="link"
              key={index}
              value={historyElement}
              onClick={historyElement => this.backToHistory(historyElement)}
            >
              {historyElement}
            </Button>
          );
        })}
      </div>
    );
  }
}

export default History;
