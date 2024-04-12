//1. import the client into this file.
const client = require('./client.js');
const { createExercise } = require('./activities.js');
const { createRoutine } = require('./routines.js');
const { createRoutines_Activities } = require('./routines_activities.js');

//2. create a drop/delete function 
const dropTables = async () => {
  try{
    //client query needs to be awaited
    //5. adding existing tables to drop
    await client.query(`
      DROP TABLE IF EXISTS routines_activities;
      DROP TABLE IF EXISTS activities;
      DROP TABLE IF EXISTS routines;
    `);
  } catch (error) {
    console.log('ERROR caught when deleting tables', error);
  }
}

//2. create an async function that creates tables
const createTables = async() => {
  try { 
    // 5. create activities table and file
    // 6. create routines table and file
    // 7. create activities_routines table and file
    await client.query(`
      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        description TEXT
      );

      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        is_public BOOLEAN,
        name VARCHAR(50) UNIQUE NOT NULL,
        goal INTEGER
      );

      CREATE TABLE routines_activities (
        id SERIAL PRIMARY KEY,
        routine_id INT REFERENCES routines(id),
        activity_id INT REFERENCES activities(id),
        count INT
      )
    `);
  } catch (error) {
    console.log(error);
  }
}

//3. create a sync function that renders/exports the data into the database
const syncAndSeed = async() => {
  //4. connect to client file
  await client.connect();
  console.log('SEED.JS HAS CONNECTED TO DATABASE');
  
  //5. call drop tables
  await dropTables();
  console.log('TABLES DROPPED');

  //5. call create table
  await createTables();
  console.log('TABLES CREATED');

  //values will be added to the three functions created (activities, routine, act+rout)
  
  //4. we need to disconnect from the database
  await client.end();
  console.log('SEED.JS HAS DISCONNECTED FROM DATABASE');
}

//4. calling function SAS
syncAndSeed();