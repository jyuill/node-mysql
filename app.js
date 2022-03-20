var msg = "Hello John";
console.log(msg);

var msg2 = "Loop it!"

for(i=0; i < 5; i++){
    console.log(msg2);
}

// load faker package (already installed)
// (install by running 'npm install @faker-js/faker --save-dev' in terminal)
const {faker}=require('@faker-js/faker')
// demo faker
console.log(faker.internet.email());
console.log(faker.date.past());

function generateAddress(){
    console.log(faker.address.streetAddress());
    console.log(faker.address.city());
    console.log(faker.address.country());
}
// test function
generateAddress();

// load mysql package (already installed)
// (install by running 'npm install mysql' in terminal)
var mysql_node = require('mysql');

// 1. Connect to MySQL
// this was tricky: initial error '...Client does not support auth protocol requested by server; 
//   consider upgrading MySQL client'
// result of Node.js MySQL pkg using older auth than MySQL 8+
// best is to create new user with old auth
// details: https://hackthestuff.com/article/error-solved-client-does-not-support-authentication-protocol-requested-by-server-consider-upgrading-mysql-client
// NOTE: will need to add pwd!!! 
var connection = mysql_node.createConnection({
    host: 'localhost',
    user: 'nodeuser',
    password: '',
    database: 'node_js_test'
});

// 2. Run Queries
//var qry = 'SELECT CURDATE()';

connection.query('SELECT CURDATE()', function (error, results, fields){
    if (error) throw error;
    console.log(results);
});

// Set query and get print out multiple variables
var qry='SELECT CURTIME() AS time, CURDATE() AS date, NOW() AS now'
connection.query(qry, function (error, results, fields){
    if (error) throw error;
    console.log(results[0].time);
    console.log(results[0].date);
    console.log(results[0].now);
});


connection.end();