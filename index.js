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

app.get('/', async (req, res) => {
  try {
    const con = await pool.connect();
    const result = await con.query('select * from users;');
    console.log(result.rows).json;
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