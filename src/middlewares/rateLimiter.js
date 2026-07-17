// In production, this map would be replaced by Redis
const rateLimitCache = new Map();

const rateLimiter = (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 5;

    if (!rateLimitCache.has(ip)) rateLimitCache.set(ip, []);
    
    const recentRequests = rateLimitCache.get(ip).filter(timestamp => now - timestamp < windowMs);
    
    if (recentRequests.length >= maxRequests) {
        return res.status(429).json({ 
            error: "Too Many Requests", 
            message: "You have exceeded your 5 requests per minute limit." 
        });
    }
    
    recentRequests.push(now);
    rateLimitCache.set(ip, recentRequests);
    next();
};

module.exports = rateLimiter;