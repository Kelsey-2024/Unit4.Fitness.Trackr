const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const { client, createUser } = require("../../db/client");

//PATH: /api/users

const signToken = (username, id) => {
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "1w",
  });
  return token;
};

usersRouter.get("/", (req, res) => {
  res.send("We're on the users page");
});

//api/users/login
usersRouter.post("/login", async (req, res) => {
  const username = req.body.username;
  const plainTextPassword = req.body.password;

  //check if user exists
  try{
    const {rows: [user]} = await client.query(`
    SELECT * FROM users
    Where username = $1
    `, [username]);
    const passwordIsMatch = await bcrypt.compare(plainTextPassword, user?.password);
    if(!user || !passwordIsMatch){
      res.sendStatus(401);
    }else{
      const token = signToken(user.username, user.id);
      res.send({message: "Successfully logged in", token})
    }
  }catch (error){
    console.log(error);
    res.send(500);
  }
});

//api/users/register
usersRouter.post("/register", async(req, res) => {
  //user is giving us username and password on the body
  const username = req.body.username;
  const plainTextPassword = req.body.password;

  //hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

  try{
    const user = createUser(username, hashedPassword);
    const token = signToken(user.username, user.id);
    res.send({message: "Successful Registration", token});
  }catch(error){
    console.log("Error caught when registering user", error);
    res.sendStatus(500);
  }
})

module.exports = usersRouter;