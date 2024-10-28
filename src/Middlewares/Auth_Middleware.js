require("dotenv").config();
const jwt = require('jsonwebtoken');
const AppError = require("../Utils/AppError");


function VerifyRequest(req, res, next) {
    const token = req.headers['authorization'];
    console.log(token);
    

    if (!token) return new AppError("UnAuthorized", 400);

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if(err) return AppError("Invalid Token" , 401)

        req.userId = decoded.Id;

        next();

    })

}

module.exports = VerifyRequest;