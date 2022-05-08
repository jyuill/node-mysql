var express = require('express');
var app = express()

app.get("/", function(req, resp){
    resp.send("hello from my app hola!");
});

app.listen(8080, function(){
console.log('Hehe app is listening on port 8080');
}
);