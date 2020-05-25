import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChannelBrowserItem from './channel_browser_item';

function ChannelBrowser() {
  const channels = useSelector(state => state.entities.channels)
  const dispatch = useDispatch()

  const channelsArray = Object.values(channels)

  const buildChannelList = () => {
    const channelList = channelsArray.map((channel, idx) => {
      if (idx === channelsArray.length) return
      return <ChannelBrowserItem channel={channel} key={idx} onClick={() => console.log('hello')}/>
    })

    return channelList
  }

  return (
    <div className='channel-browser-container' >
     {buildChannelList()}
    </div>
  );
}

export default ChannelBrowser;