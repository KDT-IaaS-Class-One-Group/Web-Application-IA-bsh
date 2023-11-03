const http = require('http');
const fs = require('fs');

const express = require('express');
const app = express();

const port = 3000;

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
})



app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`)
});

