import React from 'react'

import MessageWindow from './message-window'
import TextInput from './text-input'
import { WSOnMessage, send } from './websocket'

export class WSChat extends React.Component {
  state = {
    messages: [],
    username: null
  }

  constructor(props) {
    super(props)
    WSOnMessage(this.onMessageReceived.bind(this))
  }

  onMessageReceived(msg) {
    msg = JSON.parse(msg)
    this.setState({
      messages: this.state.messages.concat(msg)
    })
  }

  setUserName(name) {
    this.setState({
      username: name
    })
  }

  sendMessage(text) {
    const message = {
      username: this.state.username,
      text: text
    }
    send(JSON.stringify(message))
  }

  render() {
    const setUserName = this.setUserName.bind(this)
    const sendMessage = this.sendMessage.bind(this)

    if (this.state.username === null) {
      return (
        <div className='container'>
          <div className='container-title'>Enter username</div>
          <TextInput onSend={setUserName} />
        </div>
      )
    }

    return (
      <div className='container'>
        <div className='container-title'>Messages</div>
        <MessageWindow messages={this.state.messages} username={this.state.username} />
        <TextInput onSend={sendMessage} />
      </div>
    )
  }
}

export default WSChat;