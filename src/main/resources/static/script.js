const ChatApp = (function() {

    let stompClient = null;
    let username = "";

    const DOM = {
        username: document.getElementById('usernameInput'),
        receiver: document.getElementById('receiverInput'),
        message: document.getElementById('messageInput'),
        sendButton: document.getElementById('sendButton'),
        messages: document.getElementById('messages'),
        connectButton: null
    };

    function init() {

        disableChatControls();

        DOM.connectButton = document.createElement('button');
        DOM.connectButton.textContent = 'Conectar';
        DOM.connectButton.onclick = connectToServer;
        document.querySelector('.input-container').appendChild(DOM.connectButton);

        DOM.username.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') connectToServer();
        });

        DOM.sendButton.addEventListener('click', sendMessage);
        DOM.message.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') sendMessage();
        });
    }

    function disableChatControls() {
        DOM.sendButton.disabled = true;
        DOM.message.disabled = true;
        DOM.receiver.disabled = true;
    }

    function enableChatControls() {
        DOM.sendButton.disabled = false;
        DOM.message.disabled = false;
        DOM.receiver.disabled = false;
    }

    function connectToServer() {
        username = DOM.username.value.trim();

        if (username === "") {
            alert("Por favor ingrese un nombre de usuario");
            return;
        }

        const socket = new SockJS('http://localhost:8080/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, (frame) => {
            console.log('Conectado: ' + frame);

            // Suscribirse al topic de mensajes
            stompClient.subscribe('/topic/messages', (messageReceived) => {
                const messageData = JSON.parse(messageReceived.body);
                processMessage(messageData);
            });

            enableChatControls();

            showSystemMessage('Conectado como: ' + username);
        }, (error) => {
            console.error('Error de conexión:', error);
            showSystemMessage('Error de conexión al servidor. Intente nuevamente.');
        });
    }

    // Procesar mensaje recibido
    function processMessage(message) {
        // Solo mostrar mensajes relevantes para este usuario
        if (message.sender === username || message.receiver === username) {
            const isSender = message.sender === username;
            displayMessage(message, isSender);
        }
    }

    // Enviar mensaje
    function sendMessage() {
        const receiver = DOM.receiver.value.trim();
        if (receiver === "") {
            alert("Ingrese el nombre del destinatario");
            return;
        }

        const content = DOM.message.value.trim();
        if (content === "") {
            return;
        }

        const message = {
            sender: username,
            receiver: receiver,
            content: content,
            timestamp: new Date().toISOString()
        };

        // Enviar mensaje al endpoint del servidor
        stompClient.send("/app/chat1", {}, JSON.stringify(message));
        DOM.message.value = '';
    }

    function displayMessage(message, isSender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isSender ? 'sender' : 'receiver');

        const formattedMessage = isSender ?
            `Tú → ${message.receiver}: ${message.content}` :
            `${message.sender} → Tú: ${message.content}`;

        messageElement.textContent = formattedMessage;
        DOM.messages.appendChild(messageElement);
        DOM.messages.scrollTop = DOM.messages.scrollHeight;
    }

    // Mostrar mensaje del sistema
    function showSystemMessage(text) {
        const systemMsg = document.createElement('div');
        systemMsg.classList.add('system-message');
        systemMsg.textContent = text;
        DOM.messages.appendChild(systemMsg);
        DOM.messages.scrollTop = DOM.messages.scrollHeight;
    }

    // API pública
    return {
        init: init,
        connect: connectToServer
    };
})();

// Inicializar la aplicación cuando la página cargue
window.onload = ChatApp.init;