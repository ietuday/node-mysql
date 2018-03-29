const mysql = require('mysql');

// First you need to create a connection to the db
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database:'playground',
  multipleStatements: true
});

// con.connect((err) => {
//   if(err){
//     console.log('Error connecting to Db',err);
//     return;
//   }
//   console.log('Connection established');
// });

// con.query('SELECT * FROM employees', (err,rows) => {
//   if(err) throw err;

//   console.log('Data received from Db:\n');
//   console.log(rows);

//   rows.forEach((row) => {
//         console.log(`${row.name} is in ${row.location}`);
//   });

// });

//Insert

// const employee = { name: 'Winnie', location: 'Australia' };
// con.query('INSERT INTO employees SET ?', employee, (err, res) => {
//   if(err) throw err;
//   console.log(res);
//   console.log('Last insert ID:', res.insertId);
// });

//Update

// con.query(
//   'UPDATE employees SET location = ? Where ID = ?',
//   ['South Africa', 5],
//   (err, result) => {
//     if (err) throw err;

//     console.log(result);
//     console.log(`Changed ${result.changedRows} row(s)`);
//   }
// );	

//Delete

// con.query(
//   'DELETE FROM employees WHERE id = ?', [5], (err, result) => {
//     if (err) throw err;

//     console.log(`Deleted ${result.affectedRows} row(s)`);
//   }
// );

// A stored procedure is a procedure (written in, for example, SQL) stored in a
// database which can be called by the database engine and connected programming
// languages.

// con.query('CALL sp_getall()',function(err, rows){
//   if (err) throw err;

//   console.log('Data received from Db:\n');
//   console.log(rows);
// });

//Now we can pass the input parameter while making a call to the stored procedure:

// con.query('CALL sp_get_employee_detail(1)', (err, rows) => {
//   if(err) throw err;

//   console.log('Data received from Db:\n');
//   console.log(rows[0]);
// });

// when making a call to the procedure, set an out parameter and pass it in.

// con.query(
//   "SET @employee_id = 0; CALL sp_insert_employee(@employee_id, 'Ron', 'USA'); SELECT @employee_id",
//   (err, rows) => {
//     if (err) throw err;

//     console.log('Data received from Db:\n');
//     console.log(rows);
//   }
// );


// In order to avoid SQL Injection attacks, you should always escape any data
// from user land before using it inside a SQL query.

const userLandVariable = '4 ';

// con.query(
//   `SELECT * FROM employees WHERE id = ${userLandVariable}`,
//   (err, rows) => {
//     if(err) throw err;
//     console.log(rows);
//   }
// );

//Solution
// 1.
// con.query(
//   `SELECT * FROM employees WHERE id = ${mysql.escape(userLandVariable)}`,
//   function(err, rows){
//   	if(err) return err;
//   	console.log(rows);
//    }
// );

// 2

 con.query(
  'SELECT * FROM employees WHERE id = ?',
  [userLandVariable],
  (err, rows) => { 
  	if(err) return err;
  	console.log(rows);
 }
);


con.end((err) => {
  // The connection is terminated gracefully
  // Ensures all previously enqueued queries are still
  // before sending a COM_QUIT packet to the MySQL server.
  if(err) return console.log(err); 
  console.log("Connection End");
});