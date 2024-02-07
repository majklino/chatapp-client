import $ from 'jquery';
import React, { useState, useEffect } from 'react';

const ChatContainer = ({ userFromId, userTo, online_uuid }) => {
    //const [userToState, setUserTo] = useState(userTo);

    let calls_happened = false;
    localStorage.setItem('userTo', userTo);

    const addNewMessageToChat = (messageText, fromStr) => {
        if (messageText !== "") {
            var messageContainer = document.getElementById("chat-messages");
            var newMessage = document.createElement("div");
            newMessage.className = "message";

            newMessage.innerHTML = '<span class="user">' + fromStr + ':</span><span class="text">' + messageText + '</span>';

            messageContainer.appendChild(newMessage);

            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    };

    const deleteChat = () => {
        var messageContainer = document.getElementById("chat-messages");
        messageContainer.innerHTML = '';
    };

    const showLocalMessage = () => {
        var messageInput = document.getElementById("message-input");
        var messageText = messageInput.value.trim();
        messageInput.value = "";
        addNewMessageToChat(messageText, 'You');
    };

    const getMessages = () => {
        $.ajax({
            url: `http://localhost:5001/chat/messages?from=${userFromId}&to=${userTo.id}&online_uuid=${online_uuid}`,
            method: 'GET',
            success: function (res) {
                if (res.success != null) {
                    let messages = res.success.messages;
                    messages.forEach(message => {
                        if (message.from == userFromId) {
                            addNewMessageToChat(message.content, 'You');
                        }
                        else {
                            addNewMessageToChat(message.content, userTo.username);
                        }
                    });
                }
                else {
                    //TODO handle res.error
                }
            },
            error: function (error) {
                console.error('Error:', error);
            }
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        let content = document.getElementById('message-input').value;
        showLocalMessage();
        console.log(content);

        $.post('http://localhost:5001/chat/send',
            {
                from: userFromId,
                to: userTo.id,
                content: content,
                online_uuid: online_uuid
            }, (data, status) => {
                console.log(data);
                console.log(status);
            });
    }

    useEffect(() => {

        if (userTo != null) {
            deleteChat();
            getMessages();
        }

        return () => {
        };
    }, [userTo]);


    return (

        <div className="chat-container">
            {userTo ? (
                <div>
                    <div className="chat-header">
                        <h2>Chat with {userTo.username}</h2>
                    </div>
                    <div className="chat-messages" id="chat-messages">

                    </div>
                    <div className="chat-input">
                        <input type="text" id="message-input" className="input-box" placeholder="Type your message..." />
                        <button onClick={onSubmit} className="send-button">Send</button>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default ChatContainer
