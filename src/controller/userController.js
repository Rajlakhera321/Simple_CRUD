const userModel = require("../model/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

/**
 * @typedef {object} signup
 * @property {string} username - user name
 * @property {string} email - email
 * @property {string} password - password
*/
/**
 * post /api/v1/user
 * @summary signup
 * @tags User
 * @param {signup} request.body.required
 * @return {object} 201 - Success response - application/json
 */
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exist" });
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        const data = await userModel.create({
            username,
            email,
            password: hashPassword
        });
        return res.status(201).json({ message: "user created", data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internval Server Error" });
    }
}

/**
 * @typedef {object} login
 * @property {string} email - email
 * @property {string} password - password
*/
/**
 * post /api/v1/user/login
 * @summary login
 * @tags User
 * @param {login} request.body.required
 * @return {object} 200 - Success response - application/json
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        var user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User doesn't exist" });
        }
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return res.status(400).json({ message: "Invalid password" })
        }

        user.password = undefined;
        user = JSON.parse(JSON.stringify(user));
        const generateToken = jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.cookie('token', generateToken, {
            httpOnly: true,
            secure: true,
            maxAge: 10 * 60 * 1000
        })
        return res.status(200).json({ message: "login success", user: user, token: generateToken });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internval Server Error" });
    }
}

/**
 * @typedef {object} logout
*/
/**
 * put /api/v1/user/logout
 * @summary user logout
 * @tags User
 * @security BearerAuth
 * @return {object} 200 - Success response - application/json
 */
const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internval Server Error" });
    }
}

module.exports = { login, signup, logout }