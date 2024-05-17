const express = require('express')

const app = express();

app.get("/", function(req, res){
    res.send("Hellow world")
});

app.get("/user", function(req, res){
    res.send({"nome":"marcos"})
});

app.listen(8080, function() {
    console.log("Servidor rodando")
})