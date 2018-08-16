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
      <div className="message-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" placeholder="Type your message (and hit Enter)" onChange={this.onChange} />
        </form>
      </div>
    );
  }
}

export default SendMessageForm;