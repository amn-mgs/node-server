const http = require('http');
const express = require('express');
// const mysql = require('mysql');
const { Pool } = require('pg');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const config = require('./constants');

//to check if the port is equipped or not write in cmd
//cmd: netstat -ano | find ":3001" 

port = process.env.PORT || 3000;
const app = express();

let server = http.createServer(app);
let io = socketio(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configure the database Connection 
var pool = new Pool({
  //  connectionString: config.connectionString,
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  // user: config.DbUserName,
  // password: config.DbPassword,
  // host: config.DbHost,
  // port: config.DbPort,
  // database: config.Dbname,
  // ssl: false,
});

//start the server to be listening 
server.listen(port, () => console.log(`server is started at port ${port}`));


app.post('/userByLogId', async (req, res) => {
  try {
    // console.dir('the body '+req.body);
    console.log(`select * from users where logid='${req.body['logid']}';`);
    const con = await pool.connect();
    const result = await con.query(`select * from users where logid='${req.body['logid']}';`);
    console.log(result["rows"]);
    res.status(200).send(result["rows"][0]).json;
    con.release();
  } catch (error) {
    console.error(error);
    res.status(400).send("Amn Error" + error);
  }
});

app.post('/userById', async (req, res) => {
  try {
    // console.dir('the body '+req.body);
    console.log(`select * from users where id='${req.body['id']}';`);
    const con = await pool.connect();
    const result = await con.query(`select * from users where id='${req.body['id']}';`);
    console.log(result["rows"]);
    res.status(200).send(result["rows"][0]).json;
    con.release();
  } catch (error) {
    console.error(error);
    res.status(400).send("Amn Error" + error);
  }
});


app.post('/signUp', async (req, res) => {
  try {
    // console.dir('the body '+req.body);
    console.log(`select id from users where logid='${req.body['logid']}';`);
    const con = await pool.connect();
    const result = await con.query(`select id from users where logid='${req.body['logid']}';`);
    console.log(result["rows"]);
    let id;
    console.log(result.rowCount);
    if (result.rowCount > 0) {

      const resul = await con.query(`UPDATE users SET logid = '${req.body['logid']}', fullname = '${req.body['fullname']}', email = '${req.body['email']}', password = '${req.body['password']}', picurl = '${req.body['picurl']}' WHERE
                                       id = ${result.rows[0]['id']} ;`);
      id = result.rows[0]['id'];
    }
    else {

      const resu = await con.query(`INSERT INTO users (
        logid, fullname, email, password, picurl) VALUES ('${req.body['logid']}','${req.body['fullname']}','${req.body['email']}','${req.body['password']}','${req.body['picurl']}')
         returning id;`);
      // console.log(resu)
      id = resu.rows[0]['id'];
    }

    console.log(`the id of the user is ${id}`);
    const fresult = await con.query(`select * from users where id='${id}';`);
    res.status(200).send(fresult["rows"][0]).json;

    con.release();
  } catch (error) {
    console.error(error);
    res.status(400).send("Amn Error" + error);
  }
});

app.post('/register', async (req, res) => {

  try {

    console.log(`select id from users where upper(email)=upper('${req.body['email']}');`);
    const con = await pool.connect();
    const result = await con.query(`select id from users where upper(email)=upper('${req.body['email']}');`);
    console.log(result["rows"]);
    console.log(result.rowCount);
    if (result.rowCount > 0) {
      console.log('this email is already registered');
      res.status(401).send('This email is already registered').json;
    }
    else {

      const resu = await con.query(`INSERT INTO users (
          logid, fullname, email, password, picurl) VALUES ('${req.body['logid']}','${req.body['fullname']}','${req.body['email']}','${req.body['password']}','${req.body['picurl']}')
           returning id;`);

      let id = resu.rows[0]['id'];
      console.log(`the id of the user is ${id}`);
      const fresult = await con.query(`select * from users where id='${id}';`);
      res.status(200).send(fresult["rows"][0]).json;
    }
    con.release();
  } catch (error) {
    console.error(error);
    res.status(400).send("Amn Error" + error);
  }

});

app.post('/logIn', async (req, res) => {
  try {
    // console.dir('the body '+req.body);

    console.log(`select * from users where email='${req.body['email']}' and password='${req.body['password']}' ;`);
    const con = await pool.connect();
    const result = await con.query(`select * from users where upper(email)=upper('${req.body['email']}') and password='${req.body['password']}' ;`);
    console.log(result["rows"]);
    if (result.rowCount > 0) { res.status(200).send(result.rows[0]).json; }
    else {
      res.status(400).send('Wrong UserName or password');
    }

    con.release();
  } catch (error) {
    console.error(error);
    res.status(400).send("Amn Error" + error);
  }
});


app.get('/', async (req, res) => {
  try {
    const con = await pool.connect();
    const result = await con.query('select * from users;');
    console.log(result.rows);
    console.log(result.rows.length);
    res.status(200).send(result.rows).json;
    con.release();
  } catch (error) {
    console.error(error);
    res.status(400).send("Amn Error" + err);
  }
});


function checkcontodb(c) {
  c.query('select 1+1 as sol', (err, res, fields) => {
    if (err) throw error;
    ;
    console.log('the sol is = ', res[0].sol);
  });
}



// //this used with mysql db but we will not need it right now
// app.get('/mysql', (req, res) => {
//   console.log('in app get /');
//   const con = mysql.createConnection({ host: config.DbHost, database: config.Dbname, user: config.DbUserName, password: config.DbPassword });
//   con.connect();
//   // console.log(con);
//   // checkcontodb(con);
//   con.query('select * from users;', (err, rs) => {
//     if (err) throw err;
//     rs.forEach(element => {
//       console.log(element.id, element.userName);
//     });
//     res.status(200).send(rs).json;
//     console.log(rs);
//     con.end();
//   });
// });