//define connection with database 
//install pg package
const { Client } = require('pg');
const client = new Client(
  process.env.DATABASE_URL || 'postgres://localhost:5432/fitness_trackr')

// USERS

const createUser = async (username, password) => {
  try{
    const { rows: [user]} = await client.query(`
    INSERT INTO users(username, password)
    VALUES ($1, $2)
    RETURNING *;
    `, [username, password]);
  return user;
  } catch (error) {
    throw error;
  }
}

const getUserById = async (id) => {
  try{
    const {rows: [user]} = await client.query(`
    SELECT * FROM users
    WHERE id=$1;
    `, [id]);
    return user;
  }catch(error){
    throw error;
  }
}

//ACTIVITIES METHODS START

const createAnActivity = async(activityName, activityDescription) => {
  try {
    //deconstruct object and await client query then create row variables
    const { rows: [activity] } = await client.query(`
      INSERT INTO activities (name, description)
      VALUES ($1, $2)
      RETURNING *;
    `, [activityName, activityDescription]);
    return activity;
  } catch (error) {
    console.log(`ERROR caught when creatingAnActivity`, error);
  }
}

const getAllActivities = async() => {
  try{
    const { rows } = await client.query(`
      SELECT * FROM activities;
    `);
    return rows;
  }catch (error){
    console.log(error);
  }
}

const getActivityById = async (activityId) => {
  try{
   const { rows } = await client.query(`
   SELECT *FROM activities
   WHERE id = ${activityId}
   `);
   return rows;
  }catch(error){
    console.log(error);
  }
}

const deleteActivityById = async (activityId) => {
  try{
    const { rows } = await client.query(`
    DELETE FROM activities
    WHERE id ${activityId}
    RETURNING *;
    `);
    if(!rows || rows.length <=0){
      return "Could not delete table"
    } else{
      return "You have successfully deleted the table"
    }
  }catch(error){
    console.log(error);
  }
}

//ACTIVITIES METHODS END


//ROUTINES METHODS START

const createRoutine = async (routineIs_Public, routineName, routineGoal) => {
  //try + catch
  try{
  //deconstruct object and await client query then create row variables    
    const { rows: [routine] } = await client.query(`
      INSERT INTO routines(is_public, name, goal)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [routineIs_Public, routineName, routineGoal]);
    return routine;
  } catch (error) {
    console.log(`ERROR caught when creatingRoutine`, error);
  }
}

const getAllRoutines = async() => {
  try{
    const { rows } = await client.query(`
      SELECT * FROM routines;
    `);
    return rows;
  }catch(error){
    throw error;
  }
}

const getRoutineById = async (routineId) => {
  try{
    const { rows } = await client.query(`
      SELECT * FROM routines
      WHERE id = ${routineId};
    `);
    return rows;
  } catch (error) {
    console.log(error);
  }
}

const deleteRoutineById = async (routineId) => {
  try{
    const { rows } = await client.query(`
      DELETE * FROM routines
      WHERE id = ${routineId}
      RETURNING *;
    `);
    if(!rows || rows.length <= 0) {
      return "Could not delete table"
    } else{
      return "You have successfully deleted the table"
    }
  } catch (error) {
    console.log(error);
  }
}
//ROUTINES METHODS END

//COMBO METHOD
const createRoutines_Activities = async (routines_id, activities_id, count) => {
  try{
    //await client query
    const {rows: [routineAndActivity]} = await client.query(`
      INSERT INTO routines_activities(routines_id, activities_id, count)
      VALUES (${routines_id}, ${activities_id}, ${count})
      RETURNING *;
    `);
    return routineAndActivity;
  } catch (error) {
    console.log('ERROR caught when creating routines&activities', error);
  } 
}

//export the client
module.exports = {
  client,
  createUser,
  getUserById,
  createAnActivity,
  getAllActivities,
  getActivityById,
  deleteActivityById,
  createRoutine,
  getAllRoutines,
  getRoutineById,
  deleteRoutineById,
  createRoutines_Activities
};