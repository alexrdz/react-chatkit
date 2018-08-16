import React, { Component } from 'react';

class SendMessageForm extends Component {
  state = {
    text: ''
  };

  onChange = e => {
    const text = e.target.value;
    this.setState(() => ({text}));
    
    this.props.onChange();
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.text)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="what is your text?" onChange={this.onChange} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default SendMessageForm;