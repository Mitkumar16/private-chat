const socket = io();
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value.trim()) {
    const myMsg = document.createElement('div');
    myMsg.textContent = `You: ${input.value}`;
    myMsg.classList.add('my-message');
    messages.appendChild(myMsg);

    socket.emit('chat message', input.value);
    input.value = '';
  }
});

socket.on('chat message', function(msg) {
  const newMsg = document.createElement('div');
  newMsg.textContent = `Friend: ${msg}`;
  newMsg.classList.add('friend-message');
  messages.appendChild(newMsg);
});
