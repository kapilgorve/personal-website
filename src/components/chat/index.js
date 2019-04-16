import React, { Component } from 'react'

class Chat extends Component {
  render() {
    return (
      <div>
        <span
          className="skype-button bubble "
          data-contact-id="kapil.gorve"
          data-color="#180050e3"
        />
        <span className="skype-chat" data-color-message="#180050e3" />
        <script src="https://swc.cdn.skype.com/sdk/v1/sdk.min.js" />
      </div>
    )
  }
}

export default Chat
