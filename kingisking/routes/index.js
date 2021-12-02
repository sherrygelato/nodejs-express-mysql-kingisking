/* 
서버의 로직
마지막 end point가 되는 파일들을 저장한다.
*/

var express = require('express');
var router = express.Router();

// mysql setting
const mysql = require('../mysql/db.js');

/* 
mybatis $ npm i mybatis-mapper 
현재 위치의 상대경로가 아니라 
최상위 app.js 가 있는 경로를 기준으로 해야 에러가 안난다.
*/
const mybatisMapper = require('mybatis-mapper');
mybatisMapper.createMapper(['./mybatis/testMapper.xml'])

/* mybatis query */
var format = {language: 'sql', indent: ' '}

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

// 기존 mysql 연동 코드 
router.get('/mysql', function (req, res, next) {
  mysql.query('SELECT * from Users', (error, rows) => {
    console.log('id/pw: ', rows);
    res.send(rows);
  });
});

// mybatis ---

// 기존 mysql에서 mybatis 적용 코드로 업그레이드
// const query = 'SELECT * from Users';

/* 조회할 내용 */
// var query = mybatisMapper.getStatement('sqlMapper', 'getAllQuery', param, format)
// getStatement의 인자 4개: xml의 name, xml의 id, 파라미터, 포맷값

router.get('/mybatis', function (req, res, next) {
  var param = { id: req.params.id };
  var query = mybatisMapper.getStatement('sqlMapper', 'getAllQuery', param, format)
  mysql.query(query, (error, rows) => {
    res.json(rows);
  });
});

router.get('/mybatis/:id', function (req, res, next) {
  var param = { id: req.params.id };
  var query = mybatisMapper.getStatement('sqlMapper', 'getIdQuery', param, format)
  mysql.query(query, (error, rows) => {
    res.json(rows);
  });
});

module.exports = router;
