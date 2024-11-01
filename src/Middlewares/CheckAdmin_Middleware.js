const User = require('../Models/User'); 

const checkAdmin = async (req, res, next) => {
    try {
        const userId = req.userId; 

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized. Please log in.' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        next(); 
    } catch (error) {
        console.error('Error in admin check middleware:', error);
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = checkAdmin;
