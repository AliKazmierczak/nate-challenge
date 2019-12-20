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
    if (
      typeof this.state.url[0] == "undefinied" ||
      !validator.isURL(this.state.url[0])
    ) {
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
        // nie udalo sie pobrac danych
        if (error.status != 200) {
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
