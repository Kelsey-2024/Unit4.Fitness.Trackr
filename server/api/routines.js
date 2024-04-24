const routinesRouter = require("express").Router();
const { createRoutine, getAllRoutines, getRoutineById, deleteRoutineById } = require("../../db/client");
const { requireUser } = require("./utils");

//PATH: api/routines

// GET / - sends back all routines
routinesRouter.get("/", async (req, res) => {
  try{
    const allRoutines = await getAllRoutines();
    res.send(allRoutines);
  }catch (error) {
    console.log(error);
  }
});

// GET /:routineId - sends back a specific routine based on the id that is passed in
routinesRouter.get("/:routineId", async (req, res) => {
  try{
    const currentRoutine = await getRoutineById(req.params.routineId);
    res.send(currentRoutine);
  }catch (error) {
    console.log(error);
  }
});

// POST / - adds a new routine to the database and sends the newly added routine back
routinesRouter.post("/", requireUser, async (req, res) => {
  try{ //is_public, name, goal
    const newlyCreatedRoutine = await createRoutine(req.body.is_public, req.body.name, req.body.goal);
    res.send(newlyCreatedRoutine);
  }catch (error) {
    res.sendStatus(500);
  }
});

// DELETE /:routineId - removes a routine from the database and sends a successful or failed message
routinesRouter.delete("/:routineId", async (req, res) => {
  try{
    const selectedRoutineForDeletion = await deleteRoutineById(req.params.routineId);
    res.send(selectedRoutineForDeletion);
  }catch (error) {
    res.sendStatus(500);
  }
});

module.exports = routinesRouter;