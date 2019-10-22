const express = require('express')
const app = express()
const port =  80


app.listen(port, () => console.log(`Example app listening on port ${port}!`))

var mysql = require('mysql');


var connection = mysql.createConnection({
	host: "localhost",
    user: "papvida1_user",
    password: "useruseruser",
	database: "papvida1_nodos"
});

connection.connect();


app.get('/api', (req, res) => {
	//res.send("si jala");

		connection.query('select * from Nodos', function (error, results, fields) {
		  if (error) {
				res.send("Error en el query");
				throw error;

			}

		  console.log(results);
			res.send(results);
		});

});

app.get('/api/:id', (req, res) => {
		let id = req.params.id;

		connection.query('select * from Nodos where Id = "'+id+'"', function (error, results, fields) {
		  if (error) throw error;

		  console.log(results);
			res.send(results);
		});
});

//AGREGARR DESC ASC
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

app.get('/api/:id/lastread', (req, res) => {
		let id = req.params.id;

		connection.query('select * from LecturasNodos where idNodo = "'+id+'" ORDER BY fecha_hora DESC LIMIT 1', function (error, results, fields) {
		  if (error) throw error;

		  console.log(results);
			res.send(results);
		});
});


app.get('/api/variables/:id', (req, res) => {
		let id = req.params.id;


		connection.query('select * from ValuesCatalog where id = "'+id+'"', function (error, results, fields) {
		  if (error) throw error;

		  console.log(results);
			res.send(results);
		});
});
