const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// MongoDB 연결 URL 및 옵션
const url = 'mongodb://localhost:27017';
const options = { useNewUrlParser: true, useUnifiedTopology: true };

// 미들웨어 설정
app.use(express.json());

// MongoDB 연결 생성
MongoClient.connect(url, options, (err, client) => {
  if (err) {
    console.error('Failed to connect to MongoDB:', err);
  } else {
    console.log('Connected to MongoDB');

    // 데이터베이스 및 컬렉션 선택
    const db = client.db('mydatabase');
    const collection = db.collection('messages');

    // API 엔드포인트와 요청 처리
    app.get('/', (req, res) => {
      collection.find().toArray((err, messages) => {
        if (err) {
          console.error('Failed to fetch messages from MongoDB:', err);
          res.status(500).send('Failed to fetch messages');
        } else {
          res.json(messages);
        }
      });
    });

    // 서버 실행
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
