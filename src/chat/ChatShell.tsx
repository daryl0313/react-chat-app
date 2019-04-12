import React, { RefObject } from 'react';
import { Chat } from '../dtos/chat';
import { ChatItem } from './ChatItem';
import { ChatInput } from './ChatInput';

import io from "socket.io-client";

import './ChatShell.css';
import { ChatEvents } from '../dtos/chatEvents';
import { Username } from './Username';
import ChatItemList from './ChatItemList';

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

    getChatIsSelf = (c: Chat) => c.senderName === this.state.name;

    render() {
        const currentView = !!this.state.name
            ? <ChatItemList messages={this.state.messages} getIsSelf={this.getChatIsSelf} onMessageEntered={this.onMessageEntered} />
            : <Username usernameEntered={this.onUsernameEntered} />;

        return (
            <div className="chat-shell">
                {currentView}
            </div>
        );
    }
}
