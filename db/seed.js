//imports
require("dotenv").config();
const { client, createAnActivity, createRoutine, createUser, createRoutines_Activities } = require('./client');
const bcrypt = require("bcrypt");

//Delete tables
const dropTables = async() => {
  try{
    console.log(`Dropping Tables`);
    await client.query(`
      DROP TABLE IF EXISTS routines_activities;
      DROP TABLE IF EXISTS activities;
      DROP TABLE IF EXISTS routines;
      DROP TABLE IF EXISTS users;
    `);
  } catch (error) {
    console.log('ERROR caught when deleting tables', error);
  }
}

//Create tables
const createTables = async() => {
  try { 
    console.log(`Creating Tables`);
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(60) NOT NULL
      );

      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        description TEXT
      );
      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        is_public BOOLEAN,
        name VARCHAR(50) NOT NULL,
        goal TEXT
      );
      CREATE TABLE routines_activities(
        id SERIAL PRIMARY KEY,
        routines_id INT REFERENCES routines(id),
        activities_id INT REFERENCES activities(id),
        count INT
      );
    `);
  } catch (error) {
    console.log(error);
  }
}

//Create users
const createUsers = async() => {
  try{
    console.log("creating users");
    const kelsey = await createUser("Kelsey", await bcrypt.hash("kelspop", 10));
    const amy = await createUser("Amy", await bcrypt.hash("notlee", 10));
    const silvy = await createUser("silvester", await bcrypt.hash("eldoo", 10));
  }catch(error){
    throw error;
  }
}

//rebuild db
const syncAndSeed = async() => {
  await client.connect();
  console.log('SEED.JS HAS CONNECTED TO DATABASE');
  
  await dropTables();
  await createTables();
  
  //values for the routines table
  const warmUp = await createRoutine("true", "warm up", "Until warmed up and feeling loose");
  const armDay = await createRoutine("false", "calisthenic-arms", "Once a week for a year");
  const legDay = await createRoutine("true", "calisthenic-legs", "Once a week for a year");
  const backDay = await createRoutine("false", "calisthenic-back", "Once a week for a year");
  const coreDay = await createRoutine("false", "calisthenic-core", "Once a week for a year");
  
  //values for activities table
  const downwardDog = await createAnActivity("Plank to Downward Dog", "Initiate plank postures, then elevate hips to create an inverted V. Maintain posture and slowly revert to plank stance.")
  const pushUps = await createAnActivity("Push-Ups", "Initiate plank position with hands placed slightly wider than shoulder-width apart, then lower your body by bending elbows and push back up.")
  const squats = await createAnActivity("Squats", "Start in standing position with feet should-width apart and imitate the movement of sitting on a chair. Hold that position and then slowly stand back up.")
  const invertedRows = await createAnActivity("Inverted rows", "Lay on back under a really low monkey bar, grab bar and pull body up to bar.");
  const deadBug = await createAnActivity("Dead-bug", "Lay on back, lift legs up and bend in 90 degree angle. Hands should be reaching towards the sky. Lower opposite side of hand and leg and hold for 15 seconds, switch.")
  
  //values created above calling createUsers
  await createUsers();

  //values for combo table
  await createRoutines_Activities(downwardDog.id, warmUp.id, 10);
  await createRoutines_Activities(pushUps.id, armDay.id, 20);
  await createRoutines_Activities(squats.id, legDay.id, 50);
  await createRoutines_Activities(invertedRows.id, backDay.id, 25);
  await createRoutines_Activities(deadBug.id, coreDay.id, 50);

  await client.end();
  console.log('SEED.JS HAS DISCONNECTED FROM DATABASE');
}

//call
syncAndSeed();