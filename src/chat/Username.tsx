import React, { ChangeEvent } from 'react';

import './Username.css';

export interface UsernameProps {
    usernameEntered: (username: string) => void
}

export class Username extends React.PureComponent<UsernameProps, { username: string }> {

    usernameChanged = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            username: e.target.value
        })
    }

    usernameEntered = () => this.props.usernameEntered(this.state.username)


    public render() {
        return (
            <form className="username-input" onSubmit={this.usernameEntered}>
                <input className="chat-username" type="text" placeholder="Name" onChange={this.usernameChanged} />
                <button type="submit" className="btn-send-chat-username">Enter</button>
            </form>
        );
    }
}
