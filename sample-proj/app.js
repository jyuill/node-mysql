/* load required packages */
var express = require('express');
var mysql_node = require('mysql');
var bodyParser = require('body-parser')
/* specify app to use express */
var app = express();
/* set app to view engine ejs */
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


/* for convenience: print to console confirming server is listening to app */
app.listen(8080, function(){
    console.log('Hehe app is listening on port 8080');
    }
    );

// Connect to MySQL
// see higher-level app.js for details
// NOTE: will need to add pwd!!! 
var connection = mysql_node.createConnection({
    host: 'localhost',
    user: 'nodeuser',
    password: 'password',
    database: 'node_js_test'
});

/* simple message for home page '/'; html tags are optional */
app.get("/", function(req, res){
    // original demo message
    //res.send("<h1>hello from my app hola!</h1> <h2>thanks for visiting!</h2><a href='/db'>check database</a>");
    // incorporating database info
    // find count of users
    var q = "SELECT COUNT(*) AS count FROM users;";
    connection.query(q, function(err, results){
        if(err) throw err;
        console.log(results[0].count);
        var countuser = results[0].count;
    // use home.ejs based on app.set above
    res.render('home', {data: countuser});
    });
});

app.post("/register", function(req, res){
    // req.body.<text> where text = name in post request
 console.log("POST sent to /register: " + req.body.email);
 var person= {
     email: req.body.email
 };
 connection.query('INSERT INTO users SET ?', person, function(err, results) {
     if(err) throw err;
     console.log(results);
     // some options for response to user:
     // thank you note, with email included
     var persona = req.body.email; // seems redundant to have to get var again
     // annoying that you have entire send request on one line (apparently)
     //res.send("<p>Thanks <strong>" + persona + "</strong> for joining our waitlist!</p><p><a href='/'>back to home</a></p>");
     // redirect back to home page (or could be separate thank you pg or anything)
     // - note that count number increments
     res.redirect("/")
    });
});

/* another page as example: /joke */
app.get("/joke", function(req, res){
    var joke = "<strong>Q: What do you call dog that does magic? </strong><br /><em>A: Labracadabrador!<em>";
    res.send(joke);
});

/* incorporate dynamic variables based on calculation */
app.get("/rnum", function(req, res){
    var rnum = Math.random();
    var rnumten = Math.floor(Math.random()*10)+1;
    res.send("<h2>Basic random:</h2> " + rnum + "<h2>Random between 1 and 10:</h2> " + rnumten);
});



// set up query: initial demo
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