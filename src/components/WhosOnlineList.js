import React, { Component } from 'react';

class WhosOnlineList extends Component {
  render () {
    if (this.props.users) {
      return (
      <ul>
        {this.props.users.map((user, index) => (
          <li key={user.name} className={user.presence.state}>{user.name} ({user.presence.state})</li>
        ))}
      </ul>
    )
    } else {
      return <p>Loading...</p>
    }
  }
}

export default WhosOnlineList;