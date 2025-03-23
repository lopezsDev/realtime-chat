// Variables globales
var stompClient = null;
var username = "";

// Función para conectar al WebSocket
function connect() {
    username = document.getElementById('usernameInput').value.trim();

    if (username === "") {
        alert("Por favor ingrese un nombre de usuario");
        return;
    }

    var socket = new SockJS('http://localhost:8080/ws');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function(frame) {
        console.log('Connected: ' + frame);
        // Suscribirse a los mensajes destinados a este usuario
        stompClient.subscribe('/user/' + username + '/queue/messages', function(message) {
            var messageData = JSON.parse(message.body);
            var isSender = messageData.sender === username;
            displayMessage(messageData, isSender);
        });

        // Habilitar el envío de mensajes después de conectarse
        document.getElementById('sendButton').disabled = false;
        document.getElementById('messageInput').disabled = false;
        document.getElementById('receiverInput').disabled = false;

        // Añadir notificación de conexión
        var messagesDiv = document.getElementById('messages');
        var connectionMsg = document.createElement('div');
        connectionMsg.classList.add('system-message');
        connectionMsg.textContent = 'Conectado como: ' + username;
        messagesDiv.appendChild(connectionMsg);
    });
}

// Configurar eventos al cargar la página
window.onload = function() {
    // Deshabilitar el envío de mensajes hasta que se conecte
    document.getElementById('sendButton').disabled = true;
    document.getElementById('messageInput').disabled = true;
    document.getElementById('receiverInput').disabled = true;

    // Botón para conectarse
    document.getElementById('usernameInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            connect();
        }
    });

    // Añadir un botón de conexión
    var connectButton = document.createElement('button');
    connectButton.textContent = 'Conectar';
    connectButton.onclick = connect;
    document.querySelector('.input-container').appendChild(connectButton);

    document.getElementById('sendButton').addEventListener('click', sendMessage);
    document.getElementById('messageInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
};

function sendMessage() {
    //Destinatario
    var receiver = document.getElementById('receiverInput').value.trim();
    if (receiver === "") {
        alert("Ingrese el nombre del destinatario");
        return;
    }

    //Mensaje
    var messageInput = document.getElementById('messageInput');
    var messageContent = messageInput.value.trim();

    if (messageContent === "") {
        return;
    }

    var message = {
        sender: username,
        receiver: receiver,
        content: messageContent,
        timestamp: new Date().toISOString()
    };

    stompClient.send("/app/chat1", {}, JSON.stringify(message));
    // Solo mostramos el mensaje localmente cuando lo enviamos
    // El mensaje recibido será manejado por la suscripción
    displayMessage(message, true);
    messageInput.value = '';
}

function displayMessage(message, isSender) {
    var messagesDiv = document.getElementById('messages');
    var messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isSender ? 'sender' : 'receiver');

    var formattedMessage = isSender ?
        "Tú → " + message.receiver + ": " + message.content :
        message.sender + " → Tú: " + message.content;

    messageElement.textContent = formattedMessage;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll al último mensaje
}