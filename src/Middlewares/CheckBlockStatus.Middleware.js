const User = require("../Models/User");


const checkBlockStatus = async (req, res, next) => {
    const userId = req.userId; 

    console.log(userId,"userid");
    

    if (!userId) {
        return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    if (user.isBlocked) {
        return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
    }

    console.log("User is Not Blocked");
    

    next();
};


module.exports = checkBlockStatus;