import React, { Component } from 'react'
import axios from 'axios';
import UsernameForm from './components/UsernameForm';
import ChatScreen from './ChatScreen';

class App extends Component {

  state = {
    currentScreen: 'WhatIsYourUsernameScreen',
    currentUsername: ''
  }

  onUsernameSubmitted = (username) => {
    axios.post('http://localhost:3001/users', {
      username
    })
      .then(response => {
        console.log('success');
        this.setState(() => (
          {
            currentUsername: username,
            currentScreen: 'ChatScreen'
          }
        ))
      })
      .catch(error => {
        console.error('error', error);
      });
  };


  render() {
    if (this.state.currentScreen === 'WhatIsYourUsernameScreen') {
      return <UsernameForm onSubmit={this.onUsernameSubmitted} />
    } else if (this.state.currentScreen === 'ChatScreen') {
      return <ChatScreen currentUsername={this.state.currentUsername} />
    }
  }
}

export default App
