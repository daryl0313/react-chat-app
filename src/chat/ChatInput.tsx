import React from 'react';

import './ChatInput.css';

export class ChatInput extends React.PureComponent {
    render() {
        return (
            <div className="chat-input-container">
                <input className="new-chat-message" type="text" placeholder="Enter Message" />
                <button className="btn-send-message">Send</button>
            </div>
        );
    }
}