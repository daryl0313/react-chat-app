import React, { ChangeEvent, FormEvent } from 'react';

import './ChatInput.css';

export interface ChatInputProps {
    messageEntered: (message: string | null) => void
}

export class ChatInput extends React.PureComponent<ChatInputProps, { message: string | null }> {
    constructor(props: ChatInputProps) {
        super(props);
        this.state = { message: null };
    }

    chatInput!: HTMLInputElement | null;

    componentDidMount() {
        if (this.chatInput) {
            this.chatInput.focus();
        }
    }

    messageChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            message: e.target.value
        });
    }

    emitNewMessage = (e: FormEvent) => {
        e.preventDefault();
        this.props.messageEntered(this.state.message);
        this.setState({ message: null });
    }

    render() {
        return (
            <form className="chat-input-container" onSubmit={this.emitNewMessage}>
                <input className="new-chat-message" type="text" placeholder="Enter Message"
                    ref={input => this.chatInput = input} value={this.state.message || ''} onChange={this.messageChanged} />
                <button className="btn-send-message" type="submit">Send</button>
            </form>
        );
    }
}