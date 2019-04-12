import * as React from 'react';
import { Chat } from '../dtos/chat';
import { ChatInput } from './ChatInput';
import { ChatItem } from './ChatItem';

import './ChatItemList.css';

export interface IChatItemListProps {
    messages: Chat[];
    getIsSelf: (c: Chat) => boolean;
    onMessageEntered: (msg: string | null) => void;
}

export default class ChatItemList extends React.PureComponent<IChatItemListProps> {
    constructor(props: IChatItemListProps) {
        super(props);
        this.state = {
            messages: []
        };
    }

    public render() {
        const messageList = this.props.messages.map(m => <ChatItem key={m.id} {...m} isSelf={this.props.getIsSelf(m)} />);
        return (
            <React.Fragment>
                <div className="message-list">
                    {messageList}
                </div>
                <div className="chat-input">
                    <ChatInput messageEntered={this.props.onMessageEntered} />
                </div>
            </React.Fragment>
        );
    }
}
