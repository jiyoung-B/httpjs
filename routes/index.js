const express = require("express");
const path = require('path');
const router = express.Router();

// const html = 'text/html; charset=utf-8';

// show index page
router.get('/', (req, res) => {
    // res.type(html);
    // res.end('<h1>index 페이지 입니다!!</h1>');
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// 단순한 그림파일을 화면에 표시하기 위해 일일히 라우팅 설정하는 것은 번거로움
// router.get('/smile.png', (req, res) => {
//     res.sendFile(path.join(__dirname, '../static/img', 'smile.png'));
// });


module.exports = router; // 이 파일이 모듈로 작동한다는 것을 나타냄