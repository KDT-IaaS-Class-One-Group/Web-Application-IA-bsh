const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// JSON 파일 읽기
const rawData = fs.readFileSync('data/data.json');
const data = JSON.parse(rawData);

// 클라이언트에서 메시지를 받아 JSON 파일에 추가
app.post('/send-message', (req, res) => {
  const message = req.body.message;
  data.messages.push(message);

  // JSON 파일 쓰기
  fs.writeFileSync('data/data.json', JSON.stringify(data, null, 2));

  res.json({ status: 'success', message: `서버에서 받은 메시지: ${message}` });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
