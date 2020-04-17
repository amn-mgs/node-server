const http = require('http');
const express = require('express');
const mysql = require('mysql');
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
// app.use(express.json);

server.listen(port, () => console.log(`server is started at port ${port}`));

app.post('/user', (req, res, err) => {
  console.log(req.body);
  res.status(200).send(req.body);
});

app.get('/', (req, res) => {
  console.log('in app get /');
  const con = mysql.createConnection({ host: config.DbHost, database: config.Dbname, user: config.DbUserName, password: config.DbPassword });
  con.connect();
  // console.log(con);
 
  checkcontodb(con);
  // con.query('select * from users', (err, rs) => {
    // if (err) throw err;
    // rs.forEach(element => {
      // console.log(element.id, element.userName);
    // });
    // res.status(200).send(rs).json;
    // console.log(rs);
  // });

  con.end();
   // res.status(200).send('hello world form node js server').json;
});

function checkcontodb(c){
c.query('select 1+1 as sol', (err,res,fields)=>{
  if(err)throw error;
  ;
  console.log('the sol is = ',res[0].sol);
});
}

