const express = require('express');
const app = express();

const port = 3000;

const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const routes = require('./routes');
app.use('/api', routes);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// 데이터 파일 경로
const dataFilePath = path.join(__dirname, './data/data.json');

// 데이터 초기화 함수
function resetChatData() {
  const emptyData = [];
  fs.writeFile(dataFilePath, JSON.stringify(emptyData, null, 2), (err) => {
    if (err) {
      console.error('채팅 데이터 초기화 중 오류 발생:', err);
    } else {
      console.log('채팅 데이터가 초기화되었습니다.');
    }
  });
}

// 혹시 data.json에 아무런 파일도 없으면 [] 생성
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, '[]');
}

// 클라이언트로부터 POST 요청을 받아 "/sendmessage" 엔드포인트를 처리하는 핸들러 함수
app.post('/sendmessage', (req, res) => {
  // 클라이언트로부터 받은 데이터에서 "info" 값을 추출하여 "newInfo" 변수에 저장
  const { info: newInfo } = req.body;

  // 만약 "newInfo"가 없거나 빈 문자열이라면 클라이언트 오류로 응답
  if (!newInfo) {
    return res.status(400).json({ error: 'Content is required.' });
  }

  // 데이터를 파일에서 읽음
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      // 파일 읽기 중에 오류가 발생하면 서버 오류로 응답
      return res.status(500).json({ error: 'An error occurred' });
    }

    // 파일에서 읽은 데이터를 JSON 형식으로 파싱하여 "infoData" 배열에 저장
    const infoData = JSON.parse(data);

    // "newInfo" 값을 "infoData" 배열에 추가
    infoData.push({ info: newInfo });

    // 업데이트된 데이터를 다시 파일에 쓰기 위해 파일을 열었음
    fs.writeFile(dataFilePath, JSON.stringify(infoData, null, 2), (err) => {
      if (err) {
        // 파일 쓰기 중에 오류가 발생하면 서버 오류로 응답
        return res.status(500).json({ error: 'An error occurred' });
      }
      
      // 클라이언트에게 "newInfo"를 포함한 JSON 응답을 보냄
      res.json({ info: newInfo });
    });
  });
});

// 클라이언트로부터 POST 요청을 받아 "/reset" 엔드포인트를 처리하는 핸들러 함수
app.post('/reset', (req, res) => {
  // 채팅 데이터 초기화
  resetChatData();
  res.json({ message: '채팅이 초기화되었습니다.' });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
