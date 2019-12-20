import React from "react";
import axios from "axios";
import validator from "validator";
import Alert from "react-bootstrap/Alert";

class Form extends React.Component {
  state = {
    url: "",
    valid: true
  };

  change = e => {
    this.setState({
      [e.target.name]: [e.target.value]
    });
  };

  isFormValid = () => {
    if (!validator.isURL(this.state.url[0])) {
      this.setState({
        valid: false
      });
      return false;
    }
    this.setState({
      valid: true
    });
    return true;
  };

  onSubmit = async function(e) {
    e.preventDefault();
    if (!this.isFormValid(e)) {
      return;
    }
    this.props.onSubmit(this.state);
    let statistics = await axios.get("http://localhost:3000/word-count", {
      params: { url: this.state.url[0] }
    });
    this.props.passApiResults(statistics);
  };

  render() {
    let alert = null;
    if (!this.state.valid) {
      alert = (
        <Alert variant="danger">
          {" "}
          The URL you tried to input is invalid! <br />
          Please enter the full website adress.
        </Alert>
      );
    }
    return (
      <form>
        <input
          name="url"
          placeholder="Type in an http:// adress"
          value={this.state.url}
          onChange={e => this.change(e)}
        />
        <br />
        {alert}
        <button onClick={e => this.onSubmit(e)}>Calculate words!</button>
      </form>
    );
  }
}

export default Form;
