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

app.get('/api/:id/readings', (req, res) => {
		let id = req.params.id;

		connection.query('select * from LecturasNodos where idNodo = "'+id+'" ORDER BY fecha_hora ASC', function (error, results, fields) {
		  if (error) throw error;

		  console.log(results);
			res.send(results);
		});

});
