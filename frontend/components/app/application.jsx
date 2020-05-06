import React from "react";
import TopNav from './topnav/topnav_container'
import ViewHeader from './view_header/viewheader_container'
import Profile from './profile/profile_container.jsx'
import Sidebar from './sidebar/sidebar_container.jsx'
import Chatroom from './chatroom/chatroom_container'
import MessageForm from './message_form/message_form_container'

class Application extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.props.requestUi()
    this.props.requestMemberships()
    this.props.requestMessages()
    App.cable.disconnect()
    App.room = App.cable.subscriptions.create(
      { channel: "ChatChannel" },
      {
        received: data => {
          switch (data.type) {
            case "message":
              const message = {
                author: data.author,
                body: data.body,
                id: data.id,
                time: data.time,
                channel_id: data.channel_id,
              };
              this.props.incomingMessage(message)
              break;
          }
        },
        speak: function (data) { return this.perform("speak", data) },
      }
    );
  }

  render(){
    let channels = this.props.membershipList
    
    let latestTime = null;
    let currentMembership = 0;

    channels.map(channel => {
      if (latestTime === null || latestTime < channel.last_accessed) {
        latestTime = channel.last_accessed
        currentMembership = channel.id
      }
    })

    return(
      <div className="app">
          <TopNav />
          <Profile/>
          <ViewHeader currentMembership={currentMembership} />
          <Sidebar currentMembership={currentMembership} />
          <Chatroom currentMembership={currentMembership} />
          <MessageForm/>
        </div>
    )
  }    
}

export default Application;