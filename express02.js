const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index'); // 어디로?
const userRouter = require('./routes/user'); // 어디로?
const aboutRouter = require('./routes/about'); // 어디로?

const app = express();
const port = process.env.PORT || 3000;
const html = 'text/html; charset=utf-8';

// index에 대한 route handler 지정  - index 찾는 요청이 들어오면 얘가 처리한다.
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/about', aboutRouter);

app.listen(port, () => {
    console.log('express 서버 실행중... 중지하려면 ctrl+c를 눌러요!')
})