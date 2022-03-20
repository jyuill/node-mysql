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
    password: 'password',
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

// SELECT from db
var qry='SELECT * FROM users;'
connection.query(qry, function(error, results, fields){
    if (error) throw error;
    console.log(results);
});

// COUNT number of rows in db
var qry='SELECT COUNT(*) AS total FROM users;'
connection.query(qry, function(error, results, fields){
    if (error) throw error;
    console.log(results[0].total);
});

// INSERT new user
var qry='INSERT INTO users (email) VALUES ("bmarley@ymail.com")';
// (comment out to avoid duplicate entry fail for primary key)
/*
connection.query(qry, function(error, results, fields){
    if (error) throw error;
    console.log(results);
});
*/

// DYNAMICALLY INSERT users
var person = {email: 'stevej@apple.com'};
var qry = 'INSERT INTO users SET ?'
// (comment out to avoid duplicate entry fail for primary key)
/* 
connection.query(qry, person, function(err, result){
    if (err) throw error;
    console.log(result);
}); 
*/

// INSERT using FAKER (loaded above)
var person = {email: faker.internet.email()};
var qry = 'INSERT INTO users SET ?'

connection.query(qry, person, function(err, result){
    if (err) throw error;
    console.log(result);
}); 

// INSERT with date from faker
var person = {email: faker.internet.email(),
            created_at: faker.date.past()
};
// shows the raw data input from faker - with date format incompatible with javascript
console.log(person);

var qry = 'INSERT INTO users SET ?'
// set connection to variable
var add_user = connection.query(qry, person, function(err, result){
    if (err) throw error;
    console.log(result);
}); 
// console shows actual query
console.log(add_user.sql);

// MULTIPLE INSERT
// hand-coded example - works with query and connection below
// create array of arrays
/*var data = [
    ['cpow@pewpew.ca','2018-09-01 03:45:32'], 
    ['denby@derby.com', '2021-06-21 04:33:22'],
    ['covid@pandemic.com', '2021-03-13 17:30:01']
];*/

// using FAKER
var data = [
    [faker.internet.email(), faker.date.past()],
    [faker.internet.email(), faker.date.past()],
    [faker.internet.email(), faker.date.past()]
];

var qry = 'INSERT INTO users (email, created_at) VALUES ?';
connection.query(qry, [data], function(err, result){
    console.log(err);
    console.log(result);
})

// SCALE UP
// pushing variable values to data variable
var data=[];
data.push([
    faker.internet.email(),
    faker.date.past()
])
var qry = 'INSERT INTO users (email, created_at) VALUES ?';
connection.query(qry, [data], function(err, result){
    console.log(err);
    console.log(result);
})
// LOOP!
var data=[];
for(var i = 0; i<20; i++){
    data.push([
        faker.internet.email(),
        faker.date.past()
    ])
}

var qry = 'INSERT INTO users (email, created_at) VALUES ?';
connection.query(qry, [data], function(err, result){
    console.log(err);
    console.log(result);
})

connection.end();