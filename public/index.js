document.addEventListener('DOMContentLoaded', () => {
  const textInput = document.getElementById('text');
  const submitButton = document.getElementById('submit');
  const chatContainer = document.getElementById('chatContainer');

  submitButton.addEventListener('click', () => {
    const text = textInput.value;

    // 입력된 텍스트를 채팅 컨테이너에 추가
    const messageDiv = document.createElement('div');
    messageDiv.textContent = text;
    chatContainer.appendChild(messageDiv);

    // 서버로 메시지 전송 (POST 요청)
    fetch('/post-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: text }),
    })
    .then((response) => {
      if (response.ok) {
        console.log('Data sent successfully');
      } else {
        console.error('Data sending failed');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
});

document.getElementById('messageForm').addEventListener('submit', (event) => {
  event.preventDefault(); // 폼 제출 기본 동작을 막음

  const messageInput = document.getElementById('messageInput').value;

  // 서버로 메시지를 전송하는 코드를 여기에 추가
});
// 서버로 POST 요청 보내기 (예시)
fetch('/send-message', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ message: messageInput })
})
  .then(response => response.json())
  .then(data => {
    // 서버 응답 처리 (예시)
    console.log('서버 응답:', data);
  });
