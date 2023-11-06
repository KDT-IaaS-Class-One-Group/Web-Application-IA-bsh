const boxButton = document.getElementById("box");
const leftBox = document.getElementById("leftBox");
const rightBox = document.getElementById("rightBox");
let isLeftBoxVisible = true;

boxButton.addEventListener("click", () => {
  if (isLeftBoxVisible) {
    leftBox.style.transform = "translateX(-50%)";
    rightBox.style.transform = "translateX(-5%)";
  } else {
    leftBox.style.transform = "translateX(0)";
    rightBox.style.transform = "translateX(0)";
  }

  isLeftBoxVisible = !isLeftBoxVisible;
});

const chat = document.getElementById('chat');
const messageInput = document.getElementById('text');
const messageForm = document.getElementById('messageForm');

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const message = messageInput.value;
  if (message) {
    addMessageToChat(message);
    saveMessageToLocalStorage(message);
    messageInput.value = '';
  }
});

function addMessageToChat(message) {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  chat.appendChild(messageElement);
  chat.scrollTop = chat.scrollHeight;
}

function saveMessageToLocalStorage(message) {
  let savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];

  savedMessages.push(message);

  localStorage.setItem('chatMessages', JSON.stringify(savedMessages));
}

function loadMessagesFromLocalStorage() {
  const savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];

  savedMessages.forEach((message) => {
    addMessageToChat(message);
  }
  )};

loadMessagesFromLocalStorage();