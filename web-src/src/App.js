import React from "react";
import "./App.css";
import UserInput from "./components/UserInput";
import History from "./components/History";
import TopBar from "./components/Navbar";
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
        <TopBar />
        <Container fluid="true">
          <Row className="justify-content-center min-vh-100">
            <Col className="side-col" xs={3}>
              <div className="sticky-top sticky-top-cm">

                <UserInput
                  updateMenuHistory={fields => this.newInHistory(fields)}
                  passApiResults={statistics => {
                    this.setApiResuls(statistics);
                  }}
                />
              </div>
            </Col>

            <Col className="center-col" xs={6}>
              <div className="sticky-top sticky-top-cm">
                <WordCount urlCounted={this.state.urlCount}
                searchHistory={this.state.historyUrls} />
              </div>
            </Col>

            <Col className="side-col" xs={3}>
              <div className="sticky-top sticky-top-cm">
                <History
                  searchHistory={this.state.historyUrls}
                  passOldUrlResults={statAgain => {
                    this.setApiResuls(statAgain);
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
