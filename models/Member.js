const oracledb = require('../models/Oracle');

class Member {
    constructor(mno, userid, passwd, name, email) {
        this.mno = mno;
        this.userid = userid;
        this.passwd = passwd;
        this.name = name;
        this.email = email;
    }
    // 회원 정보 저장
    async insert(){
        let conn = null;
        let sql = 'insert into member' +
            ' (mno, userid, passwd, name, email)' +
            ' values (mno.nextval, :1, :2, :3, :4, :5) ';
        let params = [this.mno, this.userid, this.passwd, this.name, this.email];
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

    // 멤버 전체조회

    // 멤버 상세조회

}
module.exports = Member;