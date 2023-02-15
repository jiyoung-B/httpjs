const express = require("express");
const path = require("path");
const router = express.Router();

//const html = 'text/html; charset=utf-8';

// show about page
router.get('/', (req, res) => {
    // res.type(html);
    // res.end('<h1>about 페이지 입니다!!</h1>');
    res.sendFile(path.join(__dirname, '../public', 'about.html'));
});

module.exports = router; // 이 파일이 모듈로 작동한다는 것을 나타냄