import React from 'react';
import { Chat } from '../dtos/chat';

import './ChatItem.css';

export class ChatItem extends React.PureComponent<Chat> {
    render() {
        const { senderName, timestamp, message } = this.props;
        return (
            <div className="message-container">
                <div className="chat-meta">{senderName} - {timestamp.toLocaleString()}</div>
                <div className="chat-message">{message}</div>
            </div>
        );
    }
}
