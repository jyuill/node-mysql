/* load required packages */
var express = require('express');
var mysql_node = require('mysql');

/* specify app to use express */
var app = express();

/* for convenience: print to console confirming server is listening to app */
app.listen(8080, function(){
    console.log('Hehe app is listening on port 8080');
    }
    );

/* simple message for home page '/'; html tags are optional */
app.get("/", function(req, res){
    res.send("<h1>hello from my app hola!</h1> <h2>thanks for visiting!</h2><a href='/db'>check database</a>");
});

/* another page: /joke */
app.get("/joke", function(req, res){
    var joke = "Q: What do you call dog that does magic? <br />A: Labracadabrador!";
    res.send(joke);
});

/* incorporate dynamic variables based on calculation */
app.get("/rnum", function(req, res){
    var rnum = Math.random();
    var rnumten = Math.floor(Math.random()*10)+1;
    res.send("<h2>Basic random:</h2> " + rnum + "<h2>Random between 1 and 10:</h2> " + rnumten);
});

// Connect to MySQL
// see higher-level app.js for details
// NOTE: will need to add pwd!!! 
var connection = mysql_node.createConnection({
    host: 'localhost',
    user: 'nodeuser',
    password: 'password',
    database: 'node_js_test'
});

// set up query
app.get("/db", function(req, res){
// find count of users
    var q = "SELECT COUNT(*) AS count FROM users;";
    connection.query(q, function(err, results){
        if(err) throw err;
        console.log(results[0].count);
        var count = results[0].count;
        // respond with count
    res.send("we have " + count + " users in database.");
    });
});