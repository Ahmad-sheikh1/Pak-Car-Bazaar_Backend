const {
    User_Account_Route,
    Tracking_User_Route,
    Blog_Route,
} = require("../Routes");


module.exports = function (app) {

    app.use("/api/userAccount", User_Account_Route)

    app.use('/api/TrackingUser' , Tracking_User_Route)

    app.use('/api/Blogs' , Blog_Route)

}