// In production, this would be your Redis cluster caching responses
const idempotencyCache = new Map();

const getCachedTransaction = async (key) => {
    return idempotencyCache.get(key) || null;
};

const saveTransactionToCache = async (key, transactionRecord) => {
    idempotencyCache.set(key, transactionRecord);
};

const getAllTransactions = async () => {
    return Array.from(idempotencyCache.values());
};

module.exports = {
    getCachedTransaction,
    saveTransactionToCache,
    getAllTransactions
};