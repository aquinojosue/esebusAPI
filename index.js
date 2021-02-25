const express = require('express');
const rutasJson = require('./rutas.json')
const app = express(); 

app.get('/', function(req, res) {
    res.json(rutasJson.map(a=>a.nombreRuta))
    console.log("El total es: " + rutasJson.length)
})

app.get('/:nombreRuta', function(req, res){
    const result = rutasJson.filter( a=>
        a.nombreRuta.toLowerCase().includes(req.params.nombreRuta.toLowerCase())
    )
    res.json(result)
    console.log("El tamaño de la consulta es: "+result.length)
})

module.exports = app;