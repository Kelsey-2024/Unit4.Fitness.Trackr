//import client
const client = require('./client.js');

//async function that will take in variables and display data in rows on database
const createExercise = async(activityName, activityDescription) => {
  try {
    //deconstruct object and await client query then create row variables
    const { rows } = await client.query(`
      INSERT INTO activities (name, description)
      VALUES ('${activityName}', '${activityDescription}')
      RETURNING *;
    `);
  } catch (error) {
    console.log(`ERROR caught when creatingExercise`, error);
  }
}

//export activities
module.exports = {
  createExercise
}