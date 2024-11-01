const CatchAsync = require('../utils/CatchAsync'); 
const AppError = require("../Utils/AppError");
const SellCarModel = require("../Models/SellCar.model");


const Create_Sell_Car_Controller = CatchAsync(async (req, res, next) => {

    const {
        city,
        cityArea,
        registerIn,
        modelYear,
        make,
        model,
        exteriorColor,
        engineType,
        engineCapacity,
        assembly,
        price,
        mileageDriven,
        transmission,
        features,
        adDescription,
        contactInformation,
        photos,
    } = req.body;

    if (!city) return next(new AppError('City is required', 401));
    if (!cityArea) return next(new AppError('City area is required', 401));
    if (!registerIn) return next(new AppError('Registration location is required', 401));
    if (!modelYear) return next(new AppError('Model year is required', 401));
    if (!make) return next(new AppError('Car make is required', 401));
    if (!model) return next(new AppError('Model is required', 401));
    if (!exteriorColor) return next(new AppError('Exterior color is required', 401));
    if (!engineType) return next(new AppError('Engine type is required', 401));
    if (!engineCapacity) return next(new AppError('Engine capacity is required', 401));
    if (!assembly) return next(new AppError('Assembly type is required', 401));
    if (!price) return next(new AppError('Price is required', 401));
    if (!mileageDriven) return next(new AppError('Mileage driven is required', 401));
    if (!transmission) return next(new AppError('Transmission type is required', 401));
    if (!adDescription) return next(new AppError('Ad description is required', 401));
    if (!contactInformation) return next(new AppError('Contact information is required', 401));
    if (!photos || photos.length < 1) return next(new AppError('At least one photo is required', 401));

    await SellCarModel.create({
        city,
        cityArea,
        registerIn,
        modelYear,
        make,
        model,
        exteriorColor,
        engineType,
        engineCapacity,
        assembly,
        price,
        mileageDriven,
        transmission,
        features,
        adDescription,
        contactInformation,
        photos,
    });

    res.status(200).json({ status: 'success' });

});



module.exports = {
    Create_Sell_Car_Controller,
}

