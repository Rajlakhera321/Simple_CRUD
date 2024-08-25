const { signup, login, logout } = require("../controller/userController");
const { verify } = require("../middleware/verifyToken");

const router = require("express").Router();

router.post("/", signup);

router.post("/login", login);

router.put("/logout", verify, logout)

module.exports = router;