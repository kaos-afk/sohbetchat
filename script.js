const socket = io();

const loginScreen = document.getElementById('login-screen');
const chatScreen = document.getElementById('chat-screen');
const usernameInput = document.getElementById('username');
const joinBtn = document.getElementById('join-btn');
const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const msgInput = document.getElementById('msg');

let username = '';

joinBtn.addEventListener('click', () => {
  const name = usernameInput.value.trim();
  if (name) {
    username = name;
    socket.emit('set username', username);
    loginScreen.style.display = 'none';
    chatScreen.style.display = 'block';
  }
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = msgInput.value.trim();
  if (msg) {
    socket.emit('chat message', msg);
    msgInput.value = '';
  }
});

socket.on('chat message', (msg) => {
  const p = document.createElement('p');
  p.textContent = msg;
  chatBox.appendChild(p);
  chatBox.scrollTop = chatBox.scrollHeight;
});
