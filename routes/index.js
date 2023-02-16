const express = require("express");
const path = require('path');
const router = express.Router();

// const html = 'text/html; charset=utf-8';

// show index page
router.get('/', (req, res) => {
    // 응답으로 지정한 파일의 내용을 전송함
    // res.sendFile(path.join(__dirname, '../public', 'index.html'));
    // handlebars 뷰 엔진으로 응답처리
    res.render('index',{title:'index'});
});
router.get('/sungjuk', (req, res) => {
    res.render('sungjuk',{title:'성적처리'});
});
router.post('/sungjuk', (req, res, next) => {
    // 폼으로 전송된 데이터들은 req.body, req.body.폼이름 등으로 확인 가능
    // console.log(req);
    // console.log(req.body);
    // console.log(req.body.name, req.body.kor, req.body.eng, req.body.mat);
    let {name, kor, eng, mat} = req.body;
    console.log(name, kor, eng, mat);

    // 성적처리
    let [tot, avg, grd] = [(+kor + +eng + +mat), Number((+kor + +eng + +mat)/3), '가'];
    console.log(tot, avg, grd);
    // 데이터베이스 처리 - sungjuk 테이블에 insert

    // hw)입력받은 것을 총점, 평균, 학점으로 데이터 넣어봐
    // 라우팅: 요청이오면 요청에 적합한 view를 띄우는 것 - 데이터 처리 까지 하면 일이 많아, 안내만해주고 컨트롤러로 넘기는게 좋아
    res.redirect(304, '/'); // 다른페이지로 넘어갈 수 있어

});

// 단순한 그림파일을 화면에 표시하기 위해 일일히 라우팅 설정하는 것은 번거로움
// router.get('/smile.png', (req, res) => {
//     res.sendFile(path.join(__dirname, '../static/img', 'smile.png'));
// });


module.exports = router; // 이 파일이 모듈로 작동한다는 것을 나타냄