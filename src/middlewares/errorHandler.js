const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);
    res.status(500).json({
        error: "Internal Server Error",
        message: "Something went wrong on our end. Our team has been notified."
    });
};

module.exports = errorHandler;