import React from "react";
import "./App.css";
import Form from "./components/Form";
import History from "./components/History";
import Header from "./components/header";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import WordCount from "./components/WordCount";

class App extends React.Component {
  state = {
    historyUrls: [],
    urlCount: []
  };

  newInHistory = fields => {
    this.setState({ historyUrls: this.state.historyUrls.concat(fields.url) });
  };

  setApiResuls = statistics => {
    this.setState({ urlCount: statistics.data });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <Container fluid="true" className="min-100">
          <Row className="justify-content-center min-vh-100">
            <Col className="bg-tourquoise" xs={3}>
              <br />
              <p>Enter the URL you want us to calculate words in for you</p>
              <Form
                onSubmit={fields => this.newInHistory(fields)}
                passApiResults={statistics => {
                  this.setApiResuls(statistics);
                }}
              />
            </Col>

            <Col className="bg-powder" xs={6}>
              <WordCount urlCounted={this.state.urlCount} />
            </Col>

            <Col className="bg-tourquoise" xs={3}>
              <br />
              <History
                searchHistory={this.state.historyUrls}
                passOldUrlResults={statAgain => {
                  this.setApiResuls(statAgain);
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
