const boxButton = document.getElementById("boxButton");  // 안으로 들어갔다 나오는 button
const leftBox = document.getElementById("leftBox"); 
const rightBox = document.getElementById("rightBox");
const chatBox = document.getElementById('chatBox'); // new chatbox
const chat = document.getElementById('chat'); 
const messageForm = document.getElementById('messageForm'); 
const datatext = document.getElementById("text"); // input text
const sendbutton = document.getElementById("send") // submit button


let leftBoxOpen = true;

boxButton.addEventListener("click", () => {
  if (leftBoxOpen) {
    leftBox.style.transform = "translateX(-50%)";
    rightBox.style.transform = "translateX(-5%)";
  } else {
    leftBox.style.transform = "translateX(0)";
    rightBox.style.transform = "translateX(0)";
  }

  leftBoxOpen = !leftBoxOpen;
});


// 초기화 작업을 수행하기 위한 코드
chatBox.addEventListener('click', () => {
  // 채팅창 내용을 지우고 초기화 작업
  chat.innerHTML = ''; 
  console.log('채팅이 초기화되었습니다.');
});
 
// 메세지폼(form)이 제출(submit)될 때의 이벤트 핸들러를 정의
messageForm.addEventListener('submit', (event) => {
  // 기본 동작을 취소하는 역할 (폼 제출시 이벤트를 다시 로드하는 동작을 막음)
  event.preventDefault();

  const message = datatext.value;
  if (message) {
    // 채팅창에 추가
    addMessage(message);
    // 로컬 스토리지(Local Storage)에 저장
    saveMessage(message);
    // 메시지를 전송한 후에 다음 메시지를 입력할 수 있도록 비움
    datatext.value = '';
  }
});


function addMessage(message) {
  // 'p'요소 동적으로 생성
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  chat.appendChild(messageElement);
  // 채팅창을 맨 아래로 스크롤하는 역할
  chat.scrollTop = chat.scrollHeight;
}

// 함수를 사용하여 메시지를 로컬 스토리지(Local Storage)에 저장
function saveMessage(message) {
  // Local Storage에 저장된 값을 가져오는 작업
  let savedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];
  savedMessages.push(message);
  // 새로운 메시지를 추가하고 로컬 스토리지에서 이전에 저장된 메시지 목록을 갱신
  localStorage.setItem('chatMessages', JSON.stringify(savedMessages));
}

// "sendbutton" 클릭 이벤트
sendbutton.addEventListener('click', () => {
  // "datatext" 요소에서 값을 가져와 "info" 변수에 저장
  const info = datatext.value;
  
  // 만약 "info"가 존재하면 (빈 문자열이 아니면) 다음을 실행
  if (info) {
    // "infodata"라는 객체를 생성하고, 그 안에 "info" 값을 포함
    const infodata = { info };
  
    
    // "/sendmessage" 엔드포인트로 POST 요청을 보냄
    fetch('/sendmessage', {
      method: 'POST', // POST 메서드를 사용하여 서버로 데이터를 전송
      headers: {
        'Content-Type': 'application/json', // 요청 헤더에 JSON 형식임을 지정
      },
      body: JSON.stringify(infodata), // "infodata"를 JSON 문자열로 변환하여 요청 본문에 포함
    })
      .then((response) => response.json()) // 서버 응답을 JSON으로 파싱
      .then((info) => {
        // 서버 응답을 처리한 후, "datatext" 입력 필드를 비움
        datatext.value = '';
      });
  }
});