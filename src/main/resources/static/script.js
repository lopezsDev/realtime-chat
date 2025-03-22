var socket = new SockJS('http://localhost:8080/ws');
var stompClient = Stomp.over(socket);

stompClient.connect({}, function(frame) {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/user/queue/messages', function(message) {
        var messageData = JSON.parse(message.body);
        var isSender = messageData.sender === username;
        displayMessage(messageData, isSender);
    });
});

document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {

    //Remitente
    var username = document.getElementById('usernameInput').value.trim();
    if (username === ""){
        alert("Ingrese su nombre de usuario");
        return;
    }

    //Destinatario
    var receiver = document.getElementById('receiverInput').value.trim();
    if (receiver === ""){
        alert("Ingrese el nombre del destinatario");
        return;
    }
    //Mensaje
    var messageInput = document.getElementById('messageInput');
    var message = {
        sender: username,
        receiver: receiver,
        content: messageInput.value,
        timestamp: new Date().toISOString()
    };

    if (message.content.trim() !== "") {
        stompClient.send("/app/chat1", {}, JSON.stringify(message));
        displayMessage(message, true);
        messageInput.value = '';
    }
}

function displayMessage(message, isSender) {
    var messagesDiv = document.getElementById('messages');
    var messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isSender ? 'sender' : 'receiver');

    var senderText = isSender ? "Tú" : message.sender;
    var receiverText = isSender ? message.receiver : "Tú";

    messageElement.textContent = message.sender + ': ' + message.content;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll al último mensaje
}