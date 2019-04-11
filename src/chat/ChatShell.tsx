import React, { RefObject } from 'react';
import { Chat } from '../dtos/chat';
import { ChatItem } from './ChatItem';
import { ChatInput } from './ChatInput';

import io from "socket.io-client";

import './ChatShell.css';
import { ChatEvents } from '../dtos/chatEvents';
import { Username } from './Username';

export class ChatShell extends React.PureComponent<{}, { name: string | null, messages: Chat[] }> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            name: null,
            messages: []
        };
        this.socket.on(ChatEvents.Login, (messages: Chat[]) => this.setState(ps => ({
            ...ps,
            messages: messages.map(this.mapChatMessage)
        })));
        this.socket.on(ChatEvents.NewMessage, (message: Chat) => this.setState(ps => ({
            ...ps,
            messages: [...this.state.messages, this.mapChatMessage(message)]
        })));
    }

    socket = io('localhost:3500');
    componentWillUnmount() {
        this.socket.close();
    }

    mapChatMessage(chat: Chat): Chat {
        return {
            ...chat,
            timestamp: new Date(chat.timestamp)
        }
    }

    onUsernameEntered = (username: string) => {
        this.socket.emit(ChatEvents.Connect, username);
        this.setState(ps => ({ ...ps, name: username }));
    };

    onMessageEntered = (message: string | null) => {
        this.socket.emit(ChatEvents.NewMessage, this.state.name, message);
    };

    render() {
        let currentView: JSX.Element;
        if (this.state.name) {
            const messageList = this.state.messages.map(m => <ChatItem key={m.id} {...m} isSelf={m.senderName === this.state.name} />);
            currentView =
                <React.Fragment>
                    <div className="message-list">
                        {messageList}
                    </div>
                    <div className="chat-input">
                        <ChatInput messageEntered={this.onMessageEntered} />
                    </div>
                </React.Fragment>;
        } else {
            currentView = <Username usernameEntered={this.onUsernameEntered} />
        }
        return (
            <div className="chat-shell">
                {currentView}
            </div>
        );
    }
}
