const userModel = require("../model/userSchema");
const bcrypt = require('bcrypt');

const signup = async (req, res, next) => {
    const {email, username} = req.body;
    try {
        // const result = await userModel.create(req.body);
        const userInfo = userModel(req.body);
        const result = await userInfo.save();

        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (err) {
        if (err.code === 11000) {
            if (err.keyValue.email && err.keyValue.email === email) {  
                return res.status(400).json({
                    success: false,
                    message: 'email address aleready existed'
                })
            }
            if (err.keyValue.username && err.keyValue.username === username) {  
                return res.status(400).json({
                    success: false,
                    message: 'username aleready existed'
                })
            }
        }
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const signin = async (req, res, next) => {
    const { username, password } = req.user;
    try {

        const user = await userModel.findOne({ username }).select('+password');

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({
                success: false,
                message: 'invalid credentials'
            });
        }

        const token = user.jwtToken();
        user.password = undefined;

        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        }

        res.cookie("token", token, cookieOption);
        res.status(200).json({
            success: true,
            data: user,
            token: token
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }

}

const getuser = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const user = await userModel.findById(userId);
        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

const logout = (req, res, next) => {
    const cookieOption = {
        expires: new Date(),
        httpOnly: true
    }
    try {
        res.cookie('token', null, cookieOption);
        res.status(200).json({
            success: true,
            message: 'Logged Out'
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { signup, signin, getuser, logout };