const express = require("express");
const router = express.Router();

const html = 'text/html; charset=utf-8';

// show user page
router.get('/', (req, res) => {
    res.type(html);
    res.end('<h1>user 페이지 입니다!!</h1>');
});

router.get('/add', (req, res) => {
    res.type(html);
    res.end('<h1>user 가입 페이지 입니다!!</h1>');
});

router.get('/view', (req, res) => {
    res.type(html);
    res.end('<h1>user 상세정보 페이지 입니다!!</h1>');
});


module.exports = router; // 이 파일이 모듈로 작동한다는 것을 나타냄