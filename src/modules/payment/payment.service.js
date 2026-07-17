const crypto = require('crypto');
const paymentRepository = require('./payment.repository');

const processPayment = async (amount, currency, idempotencyKey) => {
    // 1. Check if the transaction has already happened via cache lookup
    const cachedResponse = await paymentRepository.getCachedTransaction(idempotencyKey);
    if (cachedResponse) {
        console.log(`[CACHE HIT] Returning saved transaction for key: ${idempotencyKey}`);
        return { data: cachedResponse, status: 200 };
    }

    // 2. Perform the actual business process logic
    console.log(`[PROCESSING] Charging ${amount} ${currency}...`);
    const transactionRecord = {
        transactionId: crypto.randomUUID(),
        amount: amount,
        status: "SUCCESS",
        timestamp: new Date().toISOString()
    };

    // 3. Save inside data vault storage layer before responding
    await paymentRepository.saveTransactionToCache(idempotencyKey, transactionRecord);

    return { data: transactionRecord, status: 201 };
};

const getPaymentHistory = async () => {
    const transactions = await paymentRepository.getAllTransactions();
    return transactions;
};

module.exports = { processPayment ,getPaymentHistory };