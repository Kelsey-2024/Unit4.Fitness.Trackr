const client = require('./client.js');

//async function that will take in variables and display data in rows on database
const createRoutines_Activities = async (routine_id, activity_id, count) => {
  try{
    //await client query
    await client.query(`
      INSERT INTO routines_activities(routine_id, activity_id, count);
      VALUES ('${routine_id}', '${activity_id}' '${count}');
    `);
  } catch (error) {
    console.log('ERROR caught when creating both tables', error);
  } 
}

module.exports = {
  createRoutines_Activities
}