// @ts-check

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3500;

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

/** @type {string[]} */
const users = [];
/** @type {import('../src/dtos/chat').Chat[]} */
const messages = [
    {
        id: '0',
        senderName: 'Derek',
        message: 'Hi',
        timestamp: new Date(2019, 3, 4, 14, 41, 23)
    },
    {
        id: '1',
        senderName: 'Aaron',
        message: 'Hi++',
        timestamp: new Date(2019, 3, 4, 14, 41, 51)
    },
    {
        id: '2',
        senderName: 'Chat Bot',
        message: 'Lorem ipsum dolor sit amet, ius minim accusam delicata ex. Animal oblique feugait ad mei, erat iudico appareat ad eam, dicunt erroribus an eum. Vis constituto concludaturque ex, has doming corpora insolens an. Ius latine interesset eloquentiam ea. Eu admodum detracto complectitur duo.',
        timestamp: new Date(2019, 3, 4, 14, 42, 15)
    },
    {
        id: '3',
        senderName: 'Derek',
        message: 'This is Sparta!!!',
        timestamp: new Date(2019, 3, 4, 14, 42, 55)
    },
    {
        id: '4',
        senderName: 'Chat Bot',
        message: 'Id has audiam facilis scripserit, te nemore audire eum, sed ne latine tacimates evertitur. Eos an graece saperet expetenda, cu utinam verear omittantur vis. Ut mutat suscipiantur sed, id solum eligendi vim. Ad qui mediocrem consequuntur, id propriae prodesset est. Iuvaret scaevola no duo.',
        timestamp: new Date(2019, 3, 4, 14, 45, 35)
    }
];

io.on('connection',
    /** @param {SocketIO.Socket & {username: string}} [socket] */
    (socket) => {
        let loggedin = false;
        socket.on('user-connect', username => {
            if (loggedin) return;

            socket.username = username;
            users.push(username);
            console.log(`${username} logged in`, users);
            loggedin = true;
            socket.emit('login', messages);
        });

        socket.on('newmessage', (from, message) => {
            const newMessage = getMessage(from, message);
            messages.push(newMessage);
            console.log('public message', newMessage);
            io.emit('newmessage', newMessage)
        });

        socket.on('disconnect', () => {
            if (loggedin) {
                const userIndex = users.indexOf(socket.username);
                users.splice(userIndex, 1);

                console.log(`${socket.username} logged out`);
                socket.broadcast.emit(`${socket.username} disconnected`);
            }
        });

        /**
         * @param {string} [from]
         * @param {string} [message]
         * @return {import('../src/dtos/chat').Chat}
         */
        function getMessage(from, message) {
            console.log(message);
            return {
                id: messages.length.toString(),
                senderName: from,
                message,
                timestamp: new Date()
            }
        }
    }
);
