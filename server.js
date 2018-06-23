const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// definido a pasta public como caminho estatico do front
app.use(express.static(path.join(__dirname, 'public')));
// informando o caminho das views
app.set('views', path.join(__dirname, 'public'));
// definindo o tipo da engine ejs como html
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// renderizando a pagina index como principal
app.use('/', (req, res) => {
    res.render('index.html');
})

// criando array para armazengar as mensagens
let messages = [];

// toda vez que um novo client se conectar ele recebe o socket de quem o conectou mas o id
io.on('connection', socket => {
    console.log("Socket conectado: ${socket.id}");

// enviando todas as mensages anteriores para quando atualizar a pagina
    socket.emit('previousMessages', messages);

    socket.on('sendMessage', data => {
        console.log(data);
        messages.push(data);
// diferente do emit o broadcast.emit envia para todos os id que estiverem conectado no socket    
        socket.broadcast.emit('receivedMessage', data);
    });
});

server.listen(3000);