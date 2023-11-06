const express = require('express');
const app = express();
const port = 3000;

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
})
app.get('/sub', function(req, res){
  res.sendFile(__dirname + "/public/index.html")
})

app.use(express.static('public'))

app.use(express.json()); // JSON 파싱 미들웨어 사용

app.post('/send-message', (req, res) => {
  const message = req.body.message; // 클라이언트에서 전송된 메시지
  // 메시지 처리 로직 추가
  // 응답 생성
  res.json({ status: 'success', message: `서버에서 받은 메시지: ${message}` });
});


app.listen(3000, function() {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
})