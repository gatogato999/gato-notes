/*
 * TODO: define '/register', '/login' endpoints
 */

const router = require("express").Router();

// get all  users
router.get("/users", (req, res) => {
  //
});
// get a user
router.get("/users/:id", (req, res) => {
  //
});
// register  user
router.post("/user", (req, res) => {
  res.send("new user added");
});
// update a user
router.put("/users/:id", (req, res) => {
  //
});
// delete a user
router.delete("/users/:id", (req, res) => {
  //
});

module.exports = router;
