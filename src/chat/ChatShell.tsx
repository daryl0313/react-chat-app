import React from 'react';
import { Chat } from '../dtos/chat';
import { ChatItem } from './ChatItem';
import { ChatInput } from './ChatInput';

import './ChatShell.css';

export class ChatShell extends React.PureComponent<{}, { messages: Chat[] }> {
    state = {
        messages: [
            {
                id: '1',
                senderName: 'Derek',
                message: 'Hi',
                timestamp: new Date(2019, 3, 4, 14, 41, 23)
            } as Chat,
            {
                id: '2',
                senderName: 'Aaron',
                message: 'Hi++',
                timestamp: new Date(2019, 3, 4, 14, 41, 51)
            } as Chat,
            {
                id: '3',
                senderName: 'Chat Bot',
                message: 'Lorem ipsum dolor sit amet, ius minim accusam delicata ex. Animal oblique feugait ad mei, erat iudico appareat ad eam, dicunt erroribus an eum. Vis constituto concludaturque ex, has doming corpora insolens an. Ius latine interesset eloquentiam ea. Eu admodum detracto complectitur duo.',
                timestamp: new Date(2019, 3, 4, 14, 42, 15)
            } as Chat,
            {
                id: '4',
                senderName: 'Derek',
                message: 'This is Sparta!!!',
                timestamp: new Date(2019, 3, 4, 14, 42, 55)
            } as Chat,
            {
                id: '5',
                senderName: 'Chat Bot',
                message: 'Id has audiam facilis scripserit, te nemore audire eum, sed ne latine tacimates evertitur. Eos an graece saperet expetenda, cu utinam verear omittantur vis. Ut mutat suscipiantur sed, id solum eligendi vim. Ad qui mediocrem consequuntur, id propriae prodesset est. Iuvaret scaevola no duo.',
                timestamp: new Date(2019, 3, 4, 14, 45, 35)
            } as Chat,
        ]
    };

    render() {
        return (
            <div className="chat-shell">
                <div className="message-list">
                    {this.state.messages.map(m => <ChatItem key={m.id} {...m} />)}
                </div>
                <div className="chat-input">
                    <ChatInput />
                </div>
            </div>
        );
    }
}
