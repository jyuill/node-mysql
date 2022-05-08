var express = require('express');
var app = express()

app.get("/", function(req, res){
    res.send("<h1>hello from my app hola!</h1> <h2>thanks for visiting!</h2>");
});

app.get("/joke", function(req, res){
    var joke = "Q: What do you call dog that does magic? <br />A: Labracadabrador!";
    res.send(joke);
});

app.get("/rnum", function(req, res){
    var rnum = Math.random();
    var rnumten = Math.floor(Math.random()*10)+1;
    res.send("<h2>Basic random:</h2> " + rnum + "<h2>Random between 1 and 10:</h2> " + rnumten);
});

app.listen(8080, function(){
console.log('Hehe app is listening on port 8080');
}
);