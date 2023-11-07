const express = require('express');
const app = express();

const port = 3000;

const path = require('path');

const routes = require('./routes');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
