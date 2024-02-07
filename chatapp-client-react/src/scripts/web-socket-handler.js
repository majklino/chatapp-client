// WebSocketHandler.js
export const createWebSocketConnection = (callbackWhenNewUser) => {
    const socket = new WebSocket('ws://localhost:5001');
    //socket.message('yo');
    socket.addEventListener('open', (event) => {
        console.log('WebSocket connection opened:', event);
    });

    socket.addEventListener('message', (event) => {
        let msg = event.data;
        console.log(msg);
        
        try {
            msg = JSON.parse(msg);
            if (msg.type == 'MESSAGE RECEIVED') {
                try {
                    let userToId = localStorage.getItem('userToId');
                    let userToUsername = localStorage.getItem('userToUsername');
                    console.log(userToId, msg.from);
                    if (userToId == msg.from) {
                        var messageContainer = document.getElementById("chat-messages");
                        var newMessage = document.createElement("div");
                        newMessage.className = "message";

                        newMessage.innerHTML = '<span class="user">' + userToUsername + ':</span><span class="text">' + msg.content + '</span>';

                        messageContainer.appendChild(newMessage);

                        messageContainer.scrollTop = messageContainer.scrollHeight;
                    }
                }
                catch { }

            }
            else if(msg.type == 'NEW USER'){
                try {
                    callbackWhenNewUser(msg.data)
                }
                catch { }
            }
        } catch { }
        console.log('Message from server:', msg);

        // Handle the received data as needed
    });

    socket.addEventListener('close', (event) => {
        console.log('WebSocket closed:', event);
    });

    return socket;
};