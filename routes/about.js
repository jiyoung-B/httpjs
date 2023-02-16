const express = require("express");
const path = require("path");
const router = express.Router();

// show about page
router.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '../public', 'about.html'));
    res.render('about', {title: 'about'});
});

module.exports = router; // 이 파일이 모듈로 작동한다는 것을 나타냄