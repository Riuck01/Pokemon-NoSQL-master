const express = require("express");
const dbo = require("./db/db");
const {pokedex} = require('./tableaux-pokedex.js');
const bodyParser = require('body-parser');
const port = 4444;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const jsonParser = bodyParser.json();

dbo.connectToServer();

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});

app.get("/pokemon/list", function (req, res) {
  //on se connecte à la DB MongoDB
  const dbConnect = dbo.getDb();
  //premier test permettant de récupérer mes pokemons !
  dbConnect
    .collection("pokemon")
    .find({}) // permet de filtrer les résultats
    /*.limit(50) // pourrait permettre de limiter le nombre de résultats */
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching pokemons!");
      } else {
        res.json(result);
      }
    });
  /*
  Bref lisez la doc, 
  il y a plein de manières de faire ce qu'on veut :) 
  */

});

app.post('/pokemon/insert', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body.name);
  //on se connecte à la DB MongoDB
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("pokemon")
    .insertOne({ name: body.name })
    .then(function (result, err) {
      if (err) {
        res.status(400).send("Error fetching pokemons!");
      } else {
        res.json(result);
      }
    });
  });


app.delete('/pokemon/delete', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body.name);
  //on se connecte à la DB MongoDB
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("pokemon")
    .deleteOne({ name: body.name });

  res.json(body);
});

app.post('/pokemon/update', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body.name);
  //on se connecte à la DB MongoDB
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("pokemon")
    .updateOne({numero:body.prevnumero, name:body.prevname, type:body.prevtype},{$set:{numero:body.newnumero, name:body.newname, type:body.newtype}});
  res.json(body);
});











app.get("/pokedex/list", function (req, res) {
  //on se connecte à la DB MongoDB
  const dbConnect = dbo.getDb();
  //premier test permettant de récupérer mes pokemons !
  dbConnect
    .collection("pokedex")
    .find({}) // permet de filtrer les résultats
    /*.limit(50) // pourrait permettre de limiter le nombre de résultats */
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching pokemons!");
      } else {
        res.json(result);
      }
    });
  /*
  Bref lisez la doc, 
  il y a plein de manières de faire ce qu'on veut :) 
  */

});

app.post('/pokedex/insert', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body.name);
  //on se connecte à la DB MongoDB
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("pokedex")
    .insertMany(pokedex)
    .then(function (result, err) {
      if (err) {
        res.status(400).send("Error fetching pokemons!");
      } else {
        res.json(result);
      }
    });
  });


app.delete('/pokedex/delete', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body.name);
  //on se connecte à la DB MongoDB
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("pokedex")
    .deleteOne({ name: body.name });

  res.json(body);
});

app.post('/pokedex/update', jsonParser, (req, res) => {
  const body = req.body;
  console.log('Got body:', body.name);
  //on se connecte à la DB MongoDB
  const dbConnect = dbo.getDb();
  dbConnect
    .collection("pokedex")
    .updateOne({name:body.prevname, type:body.prevtype},{$set:{name:body.newname, type:body.newtype}});
  res.json(body);
});