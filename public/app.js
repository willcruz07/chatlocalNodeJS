var socket = io.connect();

function renderMessage(message){
    $('.messages').append('<div class="message alert alert-primary" role="alert"><strong>'+ message.author +'</strong>: ' +message.message +'</div>');            
};
// renderizando mensagens anteriores ao atualizar a pagina
socket.on('previousMessage', function(messages){
    for (message of messages){
        renderMessage(message);
    }
});

// renderizando as mensages na tela
socket.on('receivedMessage', function(message){
    renderMessage(message);
});

$('#chat').submit(function(event){
    event.preventDefault();

    var author = $('input[name=username]').val();
    var message = $('input[name=message]').val();

    if (author.length && message.length) {
        var messageObject = {
            author: author, 
            message: message, 
        };
    };

    renderMessage(messageObject);
    socket.emit('sendMessage', messageObject);
})