const express = require('express');
const path = require('path');
const logger = require('morgan'); // 로그 출력기
const { engine } = require('express-handlebars')

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const aboutRouter = require('./routes/about');

const app = express();
const port = process.env.PORT || 3000;

// view 템플릿 엔진 설정
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout : 'layout'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// 라우팅을 거치지 않고 직접 호출해서 응답
app.use(express.static(path.join(__dirname, 'static')));


// 로그 설정
app.use(logger('dev'));

// index에 대한 route handler 지정 - index 찾는 요청이 들어오면 얘가 처리한다.
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/about', aboutRouter);

// 404 처리
app.use((req, res) => {
    //res.type(html);
    res.status(404);
   // res.end('<h1>404 - 존재하지않는 페이지 입니다!!</h1>');
    res.sendFile(path.join(__dirname, 'public', '404.html'));
});

// 500 처리
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500);
    // res.end('<h1>404 - 존재하지않는 페이지 입니다!!</h1>');
    res.sendFile(path.join(__dirname, 'public', '500.html'));
});

app.listen(port, () => {
    console.log('express 서버 실행중... 중지하려면 ctrl+c를 눌러요!')
})