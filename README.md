# Super SlackBoy

Slack clone is a light weight communication application where users can post real-time messages in channels for others to view.

## Features
* Instant messaging
* Messages persist in channel


## [Super SlackBoy live page](https://super-slackboy.herokuapp.com "Super SlackBoy")




## Super SlackBoy Stack:
React / Redux
Rails
Postgres

### Additional technologies:
Web sockets (Action Cable)




## Main Features:
* Messages are instant through use of websockets.  When a user joins the chat page, a user subscription is created to the chat channel.  Anytime a user posts a new message, the chat channel will update all current clients with the new message.

* Messages are persistant.  All older messages are handled through standard routes and the database, and will render upon page load.



## Code highlights

```javascript
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

        speak: function (data) { return this.perform("speak", data) },

      }
    );
  }
```

