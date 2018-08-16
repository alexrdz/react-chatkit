import React, { Component } from 'react';

class UsernameForm extends Component {
  state = {
    username: ''
  };

  onChange = e => {
    const username = e.target.value;
    this.setState(() => ({username}));
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.username)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="what is your username?" onChange={this.onChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default UsernameForm;