import React, { RefObject } from 'react';
import { Chat } from '../dtos/chat';

import './ChatItem.css';

export interface ChatItemProps extends Chat {
    isSelf: boolean;
    scrollToView: boolean;
}

export class ChatItem extends React.PureComponent<ChatItemProps> {
    constructor(props: ChatItemProps) {
        super(props);
        this.containerEl = React.createRef();
    }

    componentDidMount() {
        if (this.props.scrollToView && this.containerEl.current) {
            this.containerEl.current.scrollIntoView();
        }
    }

    containerEl: RefObject<HTMLDivElement>;

    render() {
        const { senderName, timestamp, message, isSelf } = this.props;
        return (
            <div ref={this.containerEl} className={`message-container ${isSelf && 'right'}`}>
                <div className="chat-meta">{senderName} - {timestamp.toLocaleString()}</div>
                <div className="chat-message">{message}</div>
            </div>
        );
    }
}
