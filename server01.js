const http = require('http');
const port = process.env.PORT || 3000; // 환경변수에 포트가 설정되어있으면 그대로쓰고 아니면 3000번 포트를 쓰겠다.

// localhost:3000 요청시 처리
const server = http.createServer((req,res)=>{
    // 응답헤더 작성 : 응답코드, 응답 데이터 형식 지정
    res.writeHead(200, {'Content-Type':'text/plain'});
    // 응답메세지 전송
    res.end('Hello, World!!');
});
server.listen(port, () => {
    console.log('서버 실행중... 중지하려면 ctrl+c를 눌러요!')
});
