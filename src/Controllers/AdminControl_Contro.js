const CatchAsync = require("../Utils/CatchAsync");
const AppError = require("../Utils/AppError");
const User = require("../Models/User");
const SendEstimationPriceMail = require("../Services/sendmail");
const SellCarsModel = require("../Models/SellCar.model");


const Block_User_Controller = CatchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!id) return new AppError("Id is Required", (400))

    const user = await User.findByIdAndUpdate(
        id,
        { $set: { isBlocked: true } },
        { new: true }
    );

    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
        message: 'User blocked successfully.',
        data: user
    });
})


const UnBlock_User_Controller = CatchAsync(async (req, res, next) => {
    const { id } = req.params;

    if (!id) return new AppError("Id is Required", (400))

    const user = await User.findByIdAndUpdate(
        id,
        { $set: { isBlocked: false } },
        { new: true }
    );

    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({
        message: 'User Unblocked successfully.',
        data: user
    });
})

const Estimation_Price_Controller = CatchAsync(async (req, res, next) => {
    const { email, price } = req.body;

    if (!email || !price) return next(new AppError("Require All Fields", 401));

    await SendEstimationPriceMail(email, price);

    res.status(200).json({ message: "Email Sent Successfully!" });
});

const Sell_Car_Count_Controller = CatchAsync(async (req, res, nect) => {

    const Count = await SellCarsModel.countDocuments();

    res.status(200).json({Count});

})



module.exports = {
    UnBlock_User_Controller,
    Block_User_Controller,
    Estimation_Price_Controller,
    Sell_Car_Count_Controller,
}