const socket = io('http://localhost:8000', { transports: ['websocket'] });

const form = document.getElementById('send-container');

const messageInput = document.getElementById('messageInp');

const messageContainer = document.querySelector('.container');

const send_audio = new Audio('send.mp3');

const receive_audio = new Audio('receive.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'right') { send_audio.play(); }
    else { receive_audio.play(); }
    messageContainer.scrollTop = messageContainer.scrollHeight;

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You : ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const name = prompt('Enter the Name To Join Chat');
socket.emit("new-user-joined", name);

socket.on('user-joined', name => {
    append(`${name} : joined the chat`, 'left');
})

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left');
})

socket.on('left', name => {
    append(`${name} : Left the Chat`, 'left');
})