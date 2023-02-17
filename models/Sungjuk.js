const oracledb = require('../models/Oracle');

class SungJuk {
    // 생성자 정의 - 변수 초기화
    // 즉, 매개변수로 전달된 값을 클래스 멤버변수에 대입
    // name = null; // 생성자 만들면 변수 선언한것과 같음
    // 생성자 작성 이유: 특정함수에서 생성된 값을 클래스로 전달하기 위한 방법.

    // select로 결과 출력시 반드시 필요한 옵션!! (insert, update, delete 할때는 필요 없음)
    options = {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    };
    selectsql = 'select sjno, name, kor, eng, mat, regdate from sungjuk order by sjno desc';
    constructor(name, kor, eng, mat, tot, avg, grd) {
        this.name = name;
        this.kor = kor;
        this.eng = eng;
        this.mat = mat;
        this.tot = tot;
        this.avg = avg;
        this.grd = grd;
    }
    // 성적 저장
    async insert(){
        let conn = null;
        let sql = 'insert into sungjuk' +
            ' (sjno, name, kor, eng, mat, tot, avg, grd)' +
            ' values (sjno.nextval, :1, :2, :3, :4, :5, :6, :7) ';
        let params = [this.name, this.kor, this.eng, this.mat, this.tot, this.avg, this.grd];
        try {
            conn = await oracledb.makeConn();
            let result = await conn.execute(sql, params);
            await conn.commit();
            console.log(result);
        } catch (e) {
            console.log(e);
        } finally {
            await oracledb.closeConn(conn);
        }
    }

    // 성적 전체조회
    async select() {
        let conn = null;
        let result = null;

        try {
            conn = await oracledb.makeConn();
            result = await conn.execute(this.selectsql, [], this.options);
            let rs = result.resultSet;
            let row = null;
            while((row = await rs.getRow())){
                result = new SungJuk(row[1], row[2], row[3], row[4]);
                result.sjno = row[0]; // 정의되지 않았지만 직접 생성해서 만드는거
                result.regdate = row[5]; // 정의되지 않았지만 직접 생성해서 만드는거
            }
        } catch(e){
            console.log(e);
        }finally {
            await oracledb.closeConn(conn);
        }
        return await result;
    }



    // 성적 상세조회

}
module.exports = SungJuk;