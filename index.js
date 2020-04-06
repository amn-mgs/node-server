const http = require('http');
const express = require('express');
const mysql = require('mysql');
const socketio = require('socket.io');
port = process.env.port || 3000;
const app = express();

let server = http.createServer(app);
let io = socketio(server);

server.listen(port, () => console.log(`server is started at port ${port}`));



app.get('/', (req, res) => {

  // const con = mysql.createConnection({ host: 'localhost', database: 'medical', user: 'ali', password: 'ali' });
  // con.connect();
  res.status(200).send('hello world form server').json;
  // con.query('select * from users', (err, rs) => {
  //   if (err) throw err;
  //   // rs.forEach(element => {
  //   //   console.log(element.id, element.userName);
  //   // });
  //   res.status(200).send(rs).json;
  //   console.log(rs);
  //   con.end();
  // });
});

// app.listen(3000, () => {
//   console.log('your server is started at port 3000');
// })