const socket = io();
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

// Load sound
const notificationSound = new Audio('https://www.zedge.net/ringtones/7372fbdf-f7e2-4444-aa66-7ab6b01cccdd');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const text = input.value.trim();

  if (text) {
    const myMsg = document.createElement('div');
    myMsg.textContent = `You: ${text}`;
    myMsg.classList.add('my-message');
    messages.appendChild(myMsg);
    messages.scrollTop = messages.scrollHeight;

    socket.emit('chat message', text);
    input.value = '';

    // Play sound for sent message
    notificationSound.play();
  }
});

socket.on('chat message', function (msg) {
  const newMsg = document.createElement('div');
  newMsg.textContent = `Friend: ${msg}`;
  newMsg.classList.add('friend-message');
  messages.appendChild(newMsg);
  messages.scrollTop = messages.scrollHeight;

  // Play sound for received message
  notificationSound.play();
});
