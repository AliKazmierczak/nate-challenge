import React from "react";
import axios from "axios";
import validator from "validator";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class UserInput extends React.Component {
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
    let currentUrl = this.state.url[0];
    if (typeof currentUrl == "undefined" || !validator.isURL(currentUrl)) {
      this.setState({
        valid: false,
        error_message: "This is not a valid URL address."
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
    axios
      .get("http://localhost:3000/word-count", {
        params: { url: this.state.url[0] }
      })
      .then(response => {
        this.props.passApiResults(response);
        this.props.updateMenuHistory(this.state);
      })
      .catch(error => {
        if (error.status !== 200) {
          this.setState({
            valid: false,
            error_message:
              "This URL does not contain any words I could fetch. Please another website adress."
          });
          return;
        }
      });
  };

  render() {
    let alert = null;
    if (!this.state.valid) {
      alert = <Alert variant="danger"> {this.state.error_message}</Alert>;
    }
    return (
      <Form>
        <Form.Group controlId="formBasicEmail">
          <h4>
            Enter the URL you want us to calculate words in for you:
          </h4>
          <br />
          <Form.Control
            type="text"
            placeholder="Type in an http:// adress"
            name="url"
            value={this.state.url}
            onChange={e => this.change(e)}
          />
        </Form.Group>
        <br />
        {alert}
        <br />
        <Button variant="primary" onClick={e => this.onSubmit(e)}>
          Calculate words!
        </Button>
      </Form>
    );
  }
}

export default UserInput;
