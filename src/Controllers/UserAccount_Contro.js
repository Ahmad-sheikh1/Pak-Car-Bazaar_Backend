const CatchAsync = require("../Utils/CatchAsync");
const AppError = require("../Utils/AppError");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SignUp_Controller = CatchAsync(async (req, res, next) => {

    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        throw new AppError("Require All Fields in Sign Up Controller", 400)
    }

    const isEmailExists = await User.findOne({ email });

    if (isEmailExists) return next(new AppError("Email already exists", 400));

    const hashedPassword = await bcrypt.hash(password, 13);


    const AddNewUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
    })

    res.status(200).json({ message: "User Created", success: true, User: AddNewUser })

});

const Login_Controller = CatchAsync(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email, !password) {
        throw new AppError("Email and Password is Required", 400)
    };

    const isExists = await User.findOne({ email });

    if (!isExists) return next(new AppError("Invaled Email and Password"), 400);

    const ValidatePassword = await bcrypt.compare(password, isExists.password)

    if (!ValidatePassword) {
        throw new AppError('Invalid email or password');
    }

    const token = jwt.sign(
        { Id: isExists.id, Email: isExists.email },
        process.env.JWT_SECRET,
        { expiresIn: '2d' }
    )

    res.status(200).json({
        success: true,
        token,
        isExists
    })

});


const Admin_Signup_Controller = CatchAsync(async (req, res, next) => {

    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        throw new AppError("Require All Fields in Admin Sign Up Controller", 400)
    }

    const isEmailExists = await User.findOne({ email });

    if (isEmailExists) return next(new AppError("Admin Email already exists", 400));

    const hashedPassword = await bcrypt.hash(password, 13);


    const AddNewUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: 'admin'
    })

    res.status(200).json({ message: "Admin Created", success: true, User: AddNewUser })

});

const Admin_Login_Controller = CatchAsync(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email, !password) {
        throw new AppError("Email and Password is Required", 400)
    };

    const isExists = await User.findOne({ email });

    if (!isExists) return next(new AppError("Invaled Email and Password"), 400);

    const ValidatePassword = await bcrypt.compare(password, isExists.password)

    if (!ValidatePassword) {
        throw new AppError('Invalid email or password');
    }

    const token = jwt.sign(
        { Id: isExists.id, Email: isExists.email },
        process.env.JWT_SECRET,
        { expiresIn: '2d' }
    )

    res.status(200).json({
        success: true,
        token,
        isExists
    })
})


module.exports = {
    SignUp_Controller,
    Login_Controller,
    Admin_Signup_Controller,
    Admin_Login_Controller,
}