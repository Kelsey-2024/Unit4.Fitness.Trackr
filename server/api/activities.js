const activitiesRouter = require("express").Router();
const { createAnActivity, getAllActivities, getActivityById, deleteActivityById } = require("../../db/client"); 
const { requireUser } = require("./utils");
//PATH:/api/activities

// GET / - sends back all activities
activitiesRouter.get("/", async(req, res) => {
  try{
    const allActivities = await getAllActivities();
    res.send(allActivities);
  }catch(error){
    console.log(error);
  }
});
// GET /:activityId - sends back a specific activity based on the id that is passed in
activitiesRouter.get("/:activityId", async(req, res) => {
  try{
    const currentActivity = await getActivityById(req.params.activityId);
    res.send(currentActivity);
  }catch(error){
    console.log(error);
  }
});

// POST / - adds a new activity to the database and sends the newly added activity back
activitiesRouter.post("/", requireUser, async(req, res) => {
  try{
    const newlyCreatedActivity = await createAnActivity(req.body.activityName, req.body.activityDescription);
    res.send(newlyCreatedActivity);
  }catch(error){
    res.sendStatus(500);
  }
});
// DELETE /:activityId - removes an activity from the database and sends a successful or failed message
activitiesRouter.delete("/:activityId", requireUser, async(req, res) => {
  try{
    const selectedActivityForDeletion = await deleteActivityById(req.params.activityId);
    res.send(selectedActivityForDeletion);
  }catch(error){
    res.sendStatus(500);
  }
});

module.exports = activitiesRouter;