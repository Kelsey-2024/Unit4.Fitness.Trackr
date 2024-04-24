const routines_activitiesRouter = require("express").Router();
const { createRoutines_Activities } = require("../../db/client");
const { requireUser } = require("./utils");

// POST /api/routines_activities - adds a new routines_activities to the database and sends the newly added routines_activities back
routines_activitiesRouter.post("/", requireUser, async(req,res) => {
  try{
    const newRoutineActivity = await createRoutines_Activities(req.body.activities_id, req.body.routines_id, req.body.count);
    res.send(newRoutineActivity);
  } catch (error) {
    res.sendStatus(500);
  }
})


module.exports = routines_activitiesRouter;