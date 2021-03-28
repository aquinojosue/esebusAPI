import { readFileSync } from 'fs'
import { join } from 'path'
var cors = require('cors')


const app = require('express')()
const file = readFileSync(join(__dirname, '_files', 'consolidado.json'), 'utf8')

//Cargar el json desde la lectura del archivo anterior
const rutasJson = JSON.parse(file)
const errorJson = {error:'No se encontro el recurso solicitado'}

app.use(cors())

app.all('/api', function(req, res) {
  res.json(rutasJson.map(a=>(
    {
      nombreRuta: a.nombreRuta,
      codigoRuta: a.codigoRuta,
      departamento: a.departamento
    }
  )))
})

app.all('/api/ruta', function(req, res){
  var result = errorJson;
  //Primer caso, si se necesita un codigo de rutas
  if(req.query.codigoRuta){
    result = rutasJson.filter(ruta => req.query.codigoRuta === ruta.codigoRuta)
  }
  //Segundo caso, si se necesitan rutas por nombre
  else if(req.query.nombreRuta){
    result = rutasJson.filter( ruta => 
      ruta.nombreRuta.toLowerCase().includes(req.query.nombreRuta.toLowerCase())
    )
  }
  //Tercer caso, si se necesitan rutas por codigo, como requisito es un array
  else if(req.query.rutas){
    result = rutasJson.filter(ruta => req.query.rutas.includes(ruta.codigoRuta))
  }
  else if(req.query.bulk){
    result = rutasJson;
  }
  result = (result.length>0) ? result: errorJson;
  res.json(result)
})

app.use(function (req,res,next){
	res.status(404).json(errorJson);
});

export default app
