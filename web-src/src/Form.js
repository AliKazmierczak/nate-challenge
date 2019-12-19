import React from "react";
import axios from "axios";

class Form extends React.Component {
  state = {
    url: ""
  };

  change = e => {
    this.setState({
      [e.target.name]: [e.target.value]
    });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log("state w child", this.state);
    this.props.onSubmit(this.state);
    axios
      .get("http://localhost:3000/word-count", {
        params: { url: this.state.url[0] }
      })
      .then(function(responce) {
        console.log(responce);
      });
  };

  render() {
    return (
      <form>
        <input
          name="url"
          placeholder="Type in URL you want words counted!"
          value={this.state.url}
          onChange={e => this.change(e)}
        />
        <br />
        <button onClick={e => this.onSubmit(e)}>Calculate the words!</button>
      </form>
    );
  }
}

export default Form;
