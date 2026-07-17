// Simulating the physical database table
const usersDB = Array.from({ length: 100 }, (_, i) => ({ id: i + 1, name: `User ${i + 1}` }));

const findUsersAfterCursor = async (cursor, limit) => {
    // Equivalent database query: SELECT * FROM users WHERE id > cursor LIMIT limit
    return usersDB
        .filter(user => user.id > cursor)
        .slice(0, limit);
};

module.exports = { findUsersAfterCursor };