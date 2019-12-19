import React from "react";
import "./App.css";
import Form from "./Form";
import History from "./History";
import Header from "./components/header";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class App extends React.Component {
  state = {
    historyUrls: []
  };

  inHistory = fields => {
    this.setState({ historyUrls: this.state.historyUrls.concat(fields.url) });
  };
  render() {
    return (
      <div className="App">
        <Header />
        <Container fluid="true" className="min-100">
          <Row className="justify-content-center min-vh-100">
            <Col className="bg-tourquoise" xs={3}>
              <br/>
              <p>Enter the URL you want us to calculate words in for you</p>
              <Form onSubmit={fields => this.inHistory(fields)} />
            </Col>

            <Col className="bg-powder" xs={6}>
              rezultat - kek
            </Col>

            <Col className="bg-tourquoise" xs={3}>
              <br />
              <History searchHistory={this.state.historyUrls} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
