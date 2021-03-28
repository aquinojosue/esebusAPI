const app = require('express')()

const { readFileSync } = require('fs')
const { join } = require('path')
const file = readFileSync(join(__dirname, '_files', 'rutas.json'), 'utf8')

//Aqui van los json
const rutasJson = JSON.parse(file)
const errorJson = {error:'No se encontro el recurso solicitado'}

app.get('/api', function(req, res) {
  res.json(rutasJson.map(a=>[a.nombreRuta, a.codigoRuta]))
})

app.get('/api/ruta', function(req, res){
  var result = errorJson;
  if(req.query.codigoRuta){
      result = rutasJson.filter(a=> req.query.codigoRuta === a.codigoRuta)
      result = (result.length>0) ? result[0]:errorJson;
  } else
  if(req.query.nombreRuta){
      result = rutasJson.filter( a=> 
          a.nombreRuta.toLowerCase().includes(req.query.nombreRuta.toLowerCase())
      )
      result = (result.length>0) ? result: errorJson;
  }
  res.json(result)
})

app.use(function (req,res,next){
	res.status(404).json(errorJson);
});

module.exports = app
