const userRepository = require('./user.repository');

const getUsersPaginated = async (cursor, limit) => {
    const results = await userRepository.findUsersAfterCursor(cursor, limit);
    
    const hasMore = results.length === limit;
    const nextCursor = hasMore ? results[results.length - 1].id : null;

    // The service handles formatting the business envelope data structure
    return {
        results,
        nextCursor,
        hasMore
    };
};

module.exports = { getUsersPaginated };