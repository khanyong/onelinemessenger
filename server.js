const express = require('express');
const app = express();
const port = 3000;

// 미들웨어 설정
app.use(express.json());

// API 엔드포인트와 요청 처리
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
