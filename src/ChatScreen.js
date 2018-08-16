import React, {Component} from 'react';
import Chatkit from '@pusher/chatkit';
import MessageList from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import TypingIndicator from './components/TypingIndicator';
import WhosOnlineList from './components/WhosOnlineList';

class ChatScreen extends Component {
  state = {
    messages: [],
    currentRoom: {},
    currentUser: {},
    usersWhoAreTyping: [],
  }


  componentDidMount () {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:33923be5-e0df-4fd8-95cc-53f75e6edc39',
      userId: this.props.currentUsername,
      tokenProvider: new Chatkit.TokenProvider({
        url: 'http://localhost:3001/authenticate'
      })
    });

    chatManager
      .connect()
      .then(currentUser => {
        this.setState(() => ({currentUser}))
        return currentUser.subscribeToRoom({
          roomId: 14038129,
          messageLimit: 100,
          hooks: {
            onNewMessage: message => {
              this.setState(() => ({messages: [...this.state.messages, message]}));
            },
            onUserStartedTyping: user => {
              this.setState(() => ({usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]}));
            },
            onUserStoppedTyping: user => {
              this.setState(() => ({
                usersWhoAreTyping: this.state.usersWhoAreTyping.filter(username => username !== user.name)
              }));
            },
            onUserCameOnline: () => this.forceUpdate(),
            onUserWentOffline: () => this.forceUpdate(),
            onUserJoined: () => this.forceUpdate(),
          }
        })
      })
      .then(currentRoom => this.setState(() => ({currentRoom})))
      .catch(error => console.error('error', error));
  }

  sendMessage = text => {
    this.state.currentUser.sendMessage({
      roomId: this.state.currentRoom.id,
      text,

    })
  }


  sendTypingEvent = () => {
    this.state.currentUser
      .isTypingIn({roomId: this.state.currentRoom.id})
      .catch(error => console.error('error', error));
  }


  render() {
    return (
      <div style={{
        display: 'flex',
        height: '100vh'
      }}>

        <div style={{
          width: '30%',
          backgroundColor: '#cdeadf'
        }}>
          <h2>Who's online</h2>
          <WhosOnlineList users={this.state.currentRoom.users} />
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          ChatScreen
         <div style={{
           flex: '1',
         }}>
           <MessageList messages={this.state.messages} />
         </div>
          <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
          <SendMessageForm 
            onSubmit={this.sendMessage}
            onChange={this.sendTypingEvent}
            />
        </div>
      </div>
    );
  }
}

export default ChatScreen;