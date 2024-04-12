//import client
const client = require('./client.js');

//async function that will take in variables and display data in rows on database
const createRoutine = async (routineIs_Public, routineName, routineGoal) => {
  //try + catch
  try{
  //deconstruct object and await client query then create row variables    
    const { rows } = await client.query(`
      INSERT INTO routines (is_public, name, goal)
      VALUES ('${routineIs_Public}', '${routineName}', '${routineGoal}')
      RETURNING *;
    `)
  } catch (error) {
    console.log(`ERROR caught when creatingRoutine`, error);
  }
}

module.exports = {
  createRoutine
}