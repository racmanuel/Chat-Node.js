var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/Ruta',function (req,res) {
    res.status(200).send('Hola mundo desde una ruta');
});

var messages=[
    {
    id:1,
    text: 'Welcome 🙋‍♂ to my chat 💬 I was created with JS, Node.js, and Soket.io',
    nickname: 'Bot 🤖',
    },
    {
    id: 2,
    text: 'My creator 👨‍💻 is Manuel Ramirez Coronel! https://github.com/racmanuel',
    nickname: 'Bot 🤖'
    }
];
io.on('connection', function (socket) {
    console.log("El equipo con IP: " + socket.handshake.address + " se ha conectado");
    socket.emit('messages',messages);
    socket.on('add-message',function (data) {
        messages.push(data);
        io.sockets.emit('messages',messages);
    });
});

server.listen(8080), function () {
    console.log('Server works in port 8080');
};