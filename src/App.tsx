import React from 'react';
import { ChatShell } from './chat/ChatShell';

import './App.css';

class App extends React.PureComponent {
    render() {
        return (
            <div className="App">
                <main className="App-main">
                    <ChatShell />
                </main>
            </div>
        );
    }
}

export default App;
