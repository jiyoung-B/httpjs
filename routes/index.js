const express = require("express");
const path = require('path');

const oracledb = require("oracledb");
const dbconfig = require("../dbconfig.js");
// const mariadb = require('mariadb');
// const dbconfig = require('../dbconfig2.js');

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
router.post('/sungjuk', async (req, res, next) => {
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
    let conn = null;
    let sql = 'insert into sungjuk' +
        ' (sjno, name, kor, eng, mat, tot, avg, grd)' +
        ' values (sjno.nextval, :1, :2, :3, :4, :5, :6, :7) ';
    let params = [name, kor, eng, mat, tot, avg, grd];
    try {
        oracledb.initOracleClient({libDir: 'C:/Java/instantclient_19_17'});
        /*
        오류 : Oracle Client library has already been initialized
        한번 연결한 db를 종료하지 않고 다시 연결해서 나는 오류로
        conn.close()를 await로 비동기 처리 해준다.? 소용없음 ..
        그렇다면 해결방법은??
        */
        conn = await oracledb.getConnection(dbconfig);
        let result = await conn.execute(sql, params);
        await conn.commit();
        console.log(result);
    } catch (e) {
        console.log(e);
    } finally {
        if (conn) {
            try {
                await conn.close();
            } catch (e) {
                console.log(e);
            }
        }
    }


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