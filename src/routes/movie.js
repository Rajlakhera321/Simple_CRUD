const { addMovie, updateMovie, getAllMovies } = require("../controller/movieController");
const { uploadStorage } = require("../helper/multer");
const { verify } = require("../middleware/verifyToken");

const router = require("express").Router();

router.post("/", verify, uploadStorage.single('image'), addMovie);

router.put("/:id", verify, uploadStorage.single('image'), updateMovie)

router.get("/", getAllMovies)

module.exports = router;