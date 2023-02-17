const express = require("express");
const path = require('path');
const SungJuk = require('../models/Sungjuk');

const router = express.Router();

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
router.get('/showsungjuk', async (req, res) => {
    let sjs = new SungJuk().select().then(async result => { return await result;}); // await promise로 넘어온것은 그냥 받으면 안돼. then으로 풀고 await로 return 받아야돼.
    console.log(await sjs);
    res.render('showsungjuk',{title:'성적전체보기', sjs: await sjs}); // 동적으로 생성된 데이터는 이렇게 보내겠다 -> hbs로
});

router.get('/viewsungjuk', async (req, res) => {
    let sjno = req.query.sjno; //  querystring의 매개변수 추출 - 폼을 통해 넘기는 것이 아니어서 body가 아니라query string으로 받아서 param으로 받아.

    let sjs = new SungJuk().selectOne(sjno).then(async result => { return await result;}); // await promise로 넘어온것은 그냥 받으면 안돼. then으로 풀고 await로 return 받아야돼.
    console.log(await sjs);

    res.render('viewsungjuk',{title:'성적상세보기', sjs: await sjs}); // 동적으로 생성된 데이터는 이렇게 보내겠다 -> hbs로
});

router.post('/sungjuk',(req, res, next) => { // async 뺐음
    // 폼으로 전송된 데이터들은 req.body, req.body.폼이름 등으로 확인 가능
    // console.log(req);
    // console.log(req.body);
    // console.log(req.body.name, req.body.kor, req.body.eng, req.body.mat);
    let {name, kor, eng, mat} = req.body; // 변수의 개수가 맞아야해.
    //숫자로 바꾸기
    kor = parseInt(kor);
    eng = parseInt(eng);
    mat = parseInt(mat);
    console.log(name, kor, eng, mat);

    // 성적처리
    let [tot, avg, grd] = [(+kor + +eng + +mat), Number((+kor + +eng + +mat) / 3), '가'];
    if (avg >= 90) grd = '수';
    else if (avg >= 80) grd = '우';
    else if (avg >= 70) grd = '미';
    else if (avg >= 60) grd = '양';
    console.log(tot, avg, grd);

    /**
     //테이블 sql문으로 만들고 오기.
     create table sungjuk (
     sjno number(5),
     name varchar(15),
     kor number(3),
     eng number(3),
     mat number(3),
     tot number(3),
     avg number(5, 1),
     grd varchar(3),
     regdate date default current_timestamp
     );

     create sequence sjno; // oracle은 create sequence 해줘야해.(마리아는 auto_increment)

     INSERT INTO SUNGJUK
     (sjno, name, kor, eng, mat, tot, avg, grd)
     values (sjno.nextval, 'abc123', 11,22,33,44,55.1,'가');
     * */
        // 데이터 베이스 처리 - sungjuk 테이블에 insert
        // let conn = null;
        // let sql = 'insert into sungjuk' +
        //     ' (sjno, name, kor, eng, mat, tot, avg, grd)' +
        //     ' values (sjno.nextval, :1, :2, :3, :4, :5, :6, :7) ';
        // let params = [name, kor, eng, mat, tot, avg, grd];
        // try {
        //     conn = await oracledb.makeConn();
        //     let result = await conn.execute(sql, params);
        //     await conn.commit();
        //     console.log(result);
        // } catch (e) {
        //     console.log(e);
        // } finally {
        //     await oracledb.closeConn(conn);
        // }
    new SungJuk(name, kor, eng, mat, tot, avg, grd).insert();
    /**
     *
     *  async function makeGrade() {
     *         // 성적처리
     *         let [tot, avg, grd] = [(+kor + +eng + +mat), Number((+kor + +eng + +mat)/3), '가'];
     *
     *         console.log(name, kor, eng, mat, tot, avg, grd);
     *         switch(Math.floor(avg/10)){
     *             case 10 : case 9 : grd = '수'; break;
     *             case 8 : grd = '우'; break;
     *             case 7 : grd = '미'; break;
     *             case 6 : grd = '양'; break;
     *             default : grd = '가'; break;
     *         }
     *     let params = [name, kor, eng, mat, tot, avg, grd];
     *     return params;
     *     }
     *
     *     async function insertData (params) {
     *     let conn;
     *    // let sql1 = 'create table sungjuk (sjno int auto_increment, name varchar(50) not null, kor int not null, eng int not null, mat int not null, tot int not null, avg int not null, grd varchar(10), primary key (sjno))';
     *     let sql2 = 'insert into sungjuk (name, kor, eng, mat, tot, avg, grd) values (?, ?, ?, ?, ?, ?, ?)'
     *         try {
     *             let conn= await mariadb.createConnection(dbconfig);
     *             console.log('마리아 db 접속 성공')
     *
     *             //let result = await conn.execute(sql1); // create 용
     *             let result = await conn.execute(sql2, params);
     *             await conn.commit();
     *             console.log(result, '-----------');
     *         }catch (ex) {
     *             console.error(ex);
     *         } finally {
     *             if (conn) {
     *                 try {
     *                     await conn.close();
     *                     console.log('마리아 db 접속 해제')
     *                 } catch (ex) {
     *                     console.error(ex);
     *                 }
     *             }
     *         }
     *     }
     *
     * function main(){
     *     makeGrade().then(insertData)
     * }
     * main();
     *
     * */

    // hw)입력받은 것을 총점, 평균, 학점으로 데이터 넣어봐
    // 라우팅: 요청이오면 요청에 적합한 view를 띄우는 것 - 데이터 처리 까지 하면 일이 많아, 안내만해주고 컨트롤러로 넘기는게 좋아
    res.redirect(304, '/'); // 다른페이지로 넘어갈 수 있어

});

// 단순한 그림파일을 화면에 표시하기 위해 일일히 라우팅 설정하는 것은 번거로움
// router.get('/smile.png', (req, res) => {
//     res.sendFile(path.join(__dirname, '../static/img', 'smile.png'));
// });


module.exports = router; // 이 파일이 모듈로 작동한다는 것을 나타냄