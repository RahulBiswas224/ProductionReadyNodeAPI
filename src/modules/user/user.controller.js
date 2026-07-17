const userService = require('./user.service');

const getRealUsers = async (req, res, next) => {
    try {
        const cursor = parseInt(req.query.cursor) || 0; 
        const limit = parseInt(req.query.limit) || 10;

        const { results, nextCursor, hasMore } = await userService.getUsersPaginated(cursor, limit);

        // Standardized REST JSON Envelope structure
        return res.status(200).json({
            data: results,
            meta: {
                next_cursor: nextCursor,
                has_more: hasMore
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getRealUsers };