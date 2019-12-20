import React from "react";
import Table from 'react-bootstrap/Table'

class WordCount extends React.Component {
  render() {
    return (
      <div>
        Words Counted:
        <Table striped bordered hover className="table-width">
  <thead>
    <tr>
      <th>Word</th>
      <th>Number of occurences on page</th>
    </tr>
  </thead>
        {this.props.urlCounted.map((element, index) => {
          return (
              <tbody>
            <tr key={index}>
              <td>{element.word}</td><td>{element.count}</td>
            </tr>
            </tbody>
          );
        })}
        </Table>
      </div>
    );
  }
}

export default WordCount;
