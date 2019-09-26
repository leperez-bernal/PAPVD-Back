const express = require('express')
const app = express()
const port = 3000



app.listen(port, () => console.log(`Example app listening on port ${port}!`))


var mysql = require('mysql');


var connection = mysql.createConnection({
	host: "localhost",
  user: "papvida1_user",
  password: "useruseruser",
	database: "new_schema"
});

connection.connect();


app.get('/', (req, res) => {

		connection.query('select * from nodos', function (error, results, fields) {
		  if (error) throw error;

		  console.log(results);
			res.send(results);
		});

});

app.get('/:id', (req, res) => {
		let id = req.params.id;

		connection.query('select * from nodos where id = "'+id+'"', function (error, results, fields) {
		  if (error) throw error;

		  console.log(results);
			res.send(results);
		});

});
