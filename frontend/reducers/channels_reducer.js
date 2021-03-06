import { RECEIVE_CHANNELS, RECEIVE_CHANNEL } from "../actions/channel_actions";
import { RECEIVE_MEMBERSHIPS, RECEIVE_MEMBERSHIP } from "../actions/membership_actions";
import { RECEIVE_MESSAGE } from "../actions/message_actions";

const channelsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  const nextState = Object.assign({}, oldState);
  switch (action.type) {
    case RECEIVE_MEMBERSHIPS:
      return Object.assign(action.channels, nextState);
    case RECEIVE_CHANNELS:
      return Object.assign(action.channels, nextState);
    case RECEIVE_CHANNEL:
      nextState[action.channel.id] = action.channel;
      return nextState;
    case RECEIVE_MEMBERSHIP:
      nextState[action.channel.id] = action.channel;
      return nextState;
    // case REMOVE_MEMBERSHIP:
    //   delete nextState[action.membership.channel_id];
    //   return nextState;
    case RECEIVE_MESSAGE:
      nextState[action.message.channel_id].messageIds.push(action.message.id);
      return nextState;

    default:
      return oldState;
  }
};

export default channelsReducer;
