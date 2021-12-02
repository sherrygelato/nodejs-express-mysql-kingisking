/* 
서버의 로직
마지막 end point가 되는 파일들을 저장한다.
*/

var express = require('express');
var router = express.Router();

/*
routing 매핑 시 : client의 url과 http method를 사용한다. 
Get 조회 : router.get()
Post 저장 : router.post()
Put 수정 : router.put()
Delete 삭제 : router.delete()
*/

/*
request
req.query : url?name=se => console.log(req.query.name) => se
req.params : url/5 => console.log(req.params.id) => 5

req.body : body로 넘어온 값
req.file : 파일로 넘어온 값
*/

/*
response : 클라이언트로 응답하는 객체
res.status() : status code로 정수 값
res.send() : 문자열로 응답
res.json() : json 객체로 응답
res.render() : html 변환 템플릿을 렌터(ejs)
res.sendfile() : file 다운로드
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/se/:id', function(req, res) {
  res.json({id: req.params.id});
});

module.exports = router;
