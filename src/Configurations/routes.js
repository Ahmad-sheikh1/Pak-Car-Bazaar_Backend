const {
    User_Account_Route,
    Tracking_User_Route,
    Blog_Route,
    Admin_Control,
    Sell_Car_Route,
} = require("../Routes");


module.exports = function (app) {

    app.use("/api/userAccount", User_Account_Route)

    app.use('/api/TrackingUser' , Tracking_User_Route)

    app.use('/api/Blogs' , Blog_Route)

    app.use('/api/AdminControl' , Admin_Control)

    app.use('/api/sellcar' , Sell_Car_Route);

}