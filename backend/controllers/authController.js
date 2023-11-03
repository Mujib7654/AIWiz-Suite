const errorHandler = ('../middlewares/errorMiddleware');
const userModel = require('../../models/userModel');
const errorResponse = require('../utils/errorResponse');

//JWT Token
exports.sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken(res);
    res.status(statusCode).json({
        success : true,
        token,
    });
};

//REGISTER
exports.registerController = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        //validation
        if(!username || !email || !password){
            return next(new errorResponse('Please fill all the fields'));
        }
        //existing user
        const exisitingUser = await userModel.findOne({email});
        if(exisitingUser){
            return next(new errorResponse('Email is already Registered'));
        }
        //create new user
        const user = await userModel.create({username, email, password});
        this.sendToken(user, 201, res);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

//LOGIN
exports.loginController = async () => {};

//LOGOUT
exports.logoutController = async () => {};