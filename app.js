const express = require('express')

const app = express();

app.get("/", function(req, res){
    res.send("Hellow world")
});

app.get("/user/:nome/sobrenome/:sobrenome", function(req, res){
    res.send(
        {   
            "nome":req.params.nome,
            "sobrenome":req.params.sobrenome
        }
    )
});

app.listen(8080, function() {
    console.log("Servidor rodando")
})