const express = require('express')
const app = express()
const port =  80


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

var mysql = require('mysql');
var bodyParser = require('body-parser')


/*
	Conexión a las base de datos
		host: "localhost"
    usuario: "papvida1_user",
    contraseña: "useruseruser",
		nombre de la base de datos: "papvida1_nodos"
*/

var connection = mysql.createConnection({
	host: "localhost",
    user: "papvida1_user",
    password: "useruseruser",
	database: "new_schema"
});

connection.connect();


// create application/json parser
var jsonParser = bodyParser.json()


/*
	Ruta: api/maps
	Metodo: GET
	Descripción: Devuelve un JSON con toda la información de la tabla Nodos.
*/
app.get('/api', (req, res) => {


		connection.query('select * from Nodos', function (error, results, fields) {
		  if (error) {
				res.send("Error en el query");
				throw error;

			}

		  console.log(results);
			res.send(results);
		});
});

/*
	Ruta: api/maps
	Metodo: GET
	Descripción: Devuelve un JSON con toda la información de la tabla Nodos.
	Body:
	{
		"id": String,
		"Name": String,
		"Description": String,
		"Direction": String,
		"Latitude": String,
		"Longitud": String
	}
*/
app.post('/api', jsonParser, (req, res) => {

		//q = "INSERT INTO Nodos (id, nombre, descripcion, direccion, latitud, longitud) VALUES ("+req.body.id+", "+req.body.Name+", "+req.body.Description+", "+req.body.Direction+", "+req.body.Latitude+", "+req.body.longitud+")"
		q = "INSERT INTO Nodos VALUES";
		v = "\""+req.body.id+"\","+"\""+req.body.Name+"\","+"\""+req.body.Direction+"\","+req.body.Longitud+","+req.body.Latitude+","+"\""+req.body.Description+"\""
		q = q + "(" + v + ")";
		console.log(q);

		connection.query(q, function (error, results, fields) {
		  if (error) {
				//res.send("Error en el query");
				throw error;
			}

		  //console.log(results);
			//res.send(results);
		});

		res.send(q);
});


/*
	Ruta: api/maps/id
	Metodo: GET
	Descripción: Devuelve un JSON con toda la información de un solo nodo
*/
app.get('/api/:id', (req, res) => {
		let id = req.params.id;

		connection.query('select * from Nodos where Id = "'+id+'"', function (error, results, fields) {
		  if (error) throw error;

		  console.log(results);
			res.send(results);
		});
});

/*
	Ruta: api/maps/id
	Metodo: DELETE
*/
app.delete('/api/:id', (req, res) => {
		let id = req.params.id;

		connection.query('DELETE from Nodos where Id = "'+id+'"', function (error, results, fields) {
		  if (error) throw error;

		  console.log(results);
			res.send(results);
		});
});

/*
	Ruta: api/maps/id/readings?=order
	Metodo: GET
	Descripción: Devuelve todo el histórico de lecturas del nodo especificado
	Parametros: order {puede ser ASC o DESC para mostrar la infroamcion de manera ascendente o descencdente de fechas}
*/
app.get('/api/:id/readings', (req, res) => {
		let id = req.params.id;
		let order = req.query.order;

		if (order === undefined) {
			order = 'ASC';
		}

		connection.query('select * from LecturasNodos where idNodo = "'+id+'" ORDER BY fecha_hora ' + order, function (error, results, fields) {
		  if (error) throw error;

		  console.log(results);
			res.send(results);
		});
});

/*
	Ruta: api/maps/id/lastRead
	Metodo: GET
	Descripción: Devuelve la última lectura que realizó el nodo.
*/
app.get('/api/:id/lastread', (req, res) => {
		let id = req.params.id;

		connection.query('select * from LecturasNodos where idNodo = "'+id+'" ORDER BY fecha_hora DESC LIMIT 1', function (error, results, fields) {
		  if (error) throw error;

		  console.log(results);
			res.send(results);
		});
});

/*
	Ruta: api/maps/variables/id
	Metodo: GET
	Descripción: Devuelve el objeto.
	{
		description: String,
		code: ,
		abr: String,
		unit: String,
		min: int,
		max: int,
		environmental: int
	}
*/
app.get('/api/variables/:id', (req, res) => {
		let id = req.params.id;

		connection.query('select * from ValuesCatalog where id = "'+id+'"', function (error, results, fields) {
		  if (error) throw error;

		  console.log(results);
			res.send(results);
		});
});

/*
	Ruta: api/maps/variables/id
	Metodo: GET
*/
app.delete('/api/variables/:id', (req, res) => {
		let id = req.params.id;

		connection.query('delete from ValuesCatalog where id = "'+id+'"', function (error, results, fields) {
		  if (error) throw error;

		  console.log(results);
			res.send(results);
		});
});
