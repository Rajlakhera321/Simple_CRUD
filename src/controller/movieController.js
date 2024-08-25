const movieModel = require("../model/movie");

/**
 * @typedef {object} addMovie
 * @property {string} title - movie title
 * @property {string} publishYear - publish year
 * @property {string} image - image/video - binary
*/
/**
 * post /api/v1/movie
 * @summary add movie
 * @tags Movie
 * @security BearerAuth
 * @param {addMovie} request.body.required - message info - multipart/form-data
 * @return {object} 201 - Success response - application/json
 */
const addMovie = async (req, res) => {
    try {
        const { title, publishYear } = req.body;
        if (!title || !publishYear) {
            return res.status(400).json({ message: "Title and publishYear are required" })
        }
        const image = req.file;
        const data = await movieModel.create({
            title,
            publishYear,
            image: Date.now() + '-' + image.originalname
        })
        return res.status(201).json({ message: "Movie added successfully", data });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * @typedef {object} updateMovie
 * @property {string} title - movie title
 * @property {string} publishYear - publish year
 * @property {string} image - image/video - binary
*/
/**
 * put /api/v1/movie/{id}
 * @summary update movie
 * @tags Movie
 * @security BearerAuth
 * @param {string} id.path.required - id param description
 * @param {updateMovie} request.body.required - message info - multipart/form-data
 * @return {object} 200 - Success response - application/json
 */
const updateMovie = async (req, res) => {
    try {
        const { title, publishYear } = req.body
        const image = req.file;
        const data = await movieModel.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    title,
                    publishYear,
                    image: Date.now() + '-' + image.originalname
                }
            },
            {
                new: true
            }
        );
        return res.status(201).json({ message: "Movie updated successfully", data });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * @typedef {object} getAllMovies
 */
/**
 * get /api/v1/movie
 * @summary Movie listing
 * @tags Movie
 * @return {object} 200 - Success response - application/json
 */
const getAllMovies = async (req, res) => {
    try {
        const movies = await movieModel.find();
        if (movies.length === 0) {
            res.status(404).json({ message: "Your movies list is empty" })
        }
        return res.status(200).json({ message: "Movie fetched successfully", data: movies })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    addMovie,
    updateMovie,
    getAllMovies
}