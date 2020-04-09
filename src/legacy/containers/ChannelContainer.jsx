import React from 'react';
import ChannelView from '../components/Channel';

const ChannelContainer = props => {
    const {Channel, Message, ChannelActions, MessageActions} = props;
    const {channelId, channelView} = props.params;

    return (
        <ChannelView
            channelId={channelId}
            channelView={channelView}
            Channel={Channel}
            Message={Message}
            ChannelActions={ChannelActions}
            MessageActions={MessageActions}>
            {props.children}
        </ChannelView>
    );
};

export default ChannelContainer;
