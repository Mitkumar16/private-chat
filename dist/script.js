const socket = io();
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

let messageCount = 0;

// Request notification permission on load
if (Notification.permission !== 'granted') {
  Notification.requestPermission();
}

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

    messageCount++;
    if (messageCount === 1 && Notification.permission === 'granted') {
      new Notification('✅ Message Sent', {
        body: 'Your first message was successfully sent!',
        icon: 'https://cdn-icons-png.flaticon.com/512/2099/2099058.png'
      });
    }
  }
});

socket.on('chat message', function (msg) {
  const newMsg = document.createElement('div');
  newMsg.textContent = `Friend: ${msg}`;
  newMsg.classList.add('friend-message');
  messages.appendChild(newMsg);
  messages.scrollTop = messages.scrollHeight;
});
