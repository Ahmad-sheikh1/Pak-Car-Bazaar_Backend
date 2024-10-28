const CatchAsync = require("../Utils/CatchAsync");
const redis = require("../Configurations/Redis_Configuration");
const User = require("../Models/User");


const ActiveUser_Controller = CatchAsync(async (req, res, next) => {

    const Active_Users = await redis.scard('activeUser');

    res.status(200).json({ Active_Users })

});


const TotalSignUps_Controller = CatchAsync(async (req,res,next) => {

    const count = await User.countDocuments();

    res.status(200).json({count});

})



module.exports = {
    ActiveUser_Controller,
    TotalSignUps_Controller,
}