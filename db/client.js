//define connection with database 
//install pg package
const { Client } = require('pg');
//add the server url
const client = new Client('postgres://localhost:5432/fitness_trackr')
  //console.log (`client has been defined`, client); //tested
//export the client
module.exports = client;