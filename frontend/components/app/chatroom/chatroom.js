import React from "react";
import MessageForm from "../message_form/message_form_container";
import { logoutCurrentUser } from "../../../actions/session_actions";

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.bottom = React.createRef();
  }
  
  componentDidMount() {
    this.props.requestMessages()
    App.room = App.cable.subscriptions.create(
      { channel: "ChatChannel" },
      {
        received: data => {
          switch (data.type) {
            case "message":
              const message = { author: data.author, body: data.body, id: data.id, user_id: data.user_id };
              this.props.incomingMessage(message)
              break;
          }
        },
        // connected: function () { App.cable.subscriptions.subscriptions[0].load()},
        speak: function (data) { return this.perform("speak", data) },
        // load: function () { return this.perform("load") }
      }
    );
  }

  componentDidUpdate() {
    if (this.props.messages.length) this.bottom.current.scrollIntoView();
  }

  render() {
    const messageList = this.props.messages.map((message, idx) => {
      const previousAuthorId = this.props.messages[idx - 1] ? this.props.messages[idx - 1].user_id : null
      const thisAuthorId = message.user_id
      
      if (previousAuthorId === thisAuthorId) {
        return (
          <li className="message-list-card" key={message.id}>
            <div className="left-gutter">
            </div>
            <div className="message-body">
              <div>{message.body}</div>
            </div>
            <div ref={this.bottom} />
          </li>
        );
      } else {
        return (
          <li className="message-list-card" key={message.id}>
            <div className="left-gutter">
              <img src={window.profile_pic} className="chat-profile-pic" />
            </div>
            <div className="message-body">
              <h6>{message.author.username}</h6>
              <div>{message.body}</div>
            </div>
            <div ref={this.bottom} />
          </li>
        );
      }
    });

    return (
      <div className="chatroom-container">
        <div className="message-list">
          {messageList}
        </div>
        <MessageForm />
      </div>
    );
  }
}


export default ChatRoom;