import React, { RefObject } from 'react';
import { Chat } from '../dtos/chat';

import './ChatItem.css';

export interface ChatItemProps extends Chat {
    isSelf: boolean;
}

export class ChatItem extends React.PureComponent<ChatItemProps> {
    render() {
        const { senderName, timestamp, message, isSelf } = this.props;
        return (
            <div className={`message-container ${isSelf && 'right'}`}>
                <div className="chat-meta">{senderName} - {timestamp.toLocaleString()}</div>
                <div className="chat-message">{message}</div>
            </div>
        );
    }
}
