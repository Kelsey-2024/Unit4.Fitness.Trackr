//import the client into this file.
const client = require('./client.js');
//console.log('client connected', client); // connected
//create a drop/delete table

//create an async table
  //perhaps create tables in corresponding files?
const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        description TEXT
      );
    `)
  } catch (error) {
    console.log(error);
  }
}

//create a sync function that renders/exports the data into the database
const syncAndSeed = async() => {
  await client.connect();
  console.log('connected');
}
syncAndSeed();