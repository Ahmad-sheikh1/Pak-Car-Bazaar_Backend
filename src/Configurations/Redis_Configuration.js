const { Redis } = require("ioredis");



const redis = new Redis({
    // And All Other Configurations
})

redis.on('connect', () => {
    console.log('Connected to Redis server successfully.'.red.bold);
});


module.exports = redis;