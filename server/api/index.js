const jwt = require("jsonwebtoken");
const apiRouter = require("express").Router();
const { getUserById } = require("../../db/client");

apiRouter.use(async (req, res) => {
  //check to see if there's a token
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if(!auth){
    next();
  }
  else if(auth.startsWith(prefix)){
    const token = auth.slice(prefix.length);

    const {id} = jwt.verify(token, process.env.JWT_SECRET);

    if(id) {
      const user = await getUserById(id);
      req.user = {id: user.id, username: user.username};
      next();
    }else{
      next();
    }
  } else{
    next();
  }
});

apiRouter.get("/", (req, res) => {
  res.send("This is the root for /api");
})

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const activitiesRouter = require("./activities");
apiRouter.use("/activities", activitiesRouter);

const routinesRouter = require("./routines");
apiRouter.use("/routines", routinesRouter);

const routines_activitiesRouter = require("./routines_activities");
apiRouter.use("/routines_activities", routines_activitiesRouter);

module.exports = apiRouter;