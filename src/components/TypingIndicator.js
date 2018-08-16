import React, { Component } from 'react';

class TypingIndicator extends Component {
  render() {
    
    if (this.props.usersWhoAreTyping.length === 0) {
      return <div className="typing-indicator" />
    } else if (this.props.usersWhoAreTyping.length === 1) {
      return <div className="typing-indicator"><p>{this.props.usersWhoAreTyping[0]} is typing...</p></div>
    } else if (this.props.usersWhoAreTyping.length > 1) {
      return <div className="typing-indicator"><p>{this.props.usersWhoAreTyping.join(' and ')} are typing...</p></div>
    }
    
  }
}

export default TypingIndicator;