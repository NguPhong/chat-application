// create server
let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);

app.use(express.static('web'));
app.use(express.static('Images'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/web/index.html');
});

io.on('connection', function(client) {
    client.on('send-message-to-server', function(message){
        client.emit('send-message-to-client', message);
        client.broadcast.emit('send-message-to-client', message);
    });
})

server.listen(2401, function () {
    console.log('Server listening at port 2401');
});