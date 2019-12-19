import React from "react";
import "./App.css";
import Form from "./Form";
import Menu from "./Menu";
import Header from "./components/header"
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Menu searchHistory={this.state.historyUrls} />
        <Form onSubmit={fields => this.inHistory(fields)} />

      </div>
    );
  }
}

export default App;
