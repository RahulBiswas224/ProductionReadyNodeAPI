const paymentService = require('./payment.service');

const handlePayment = async (req, res, next) => {
    try {
        const { amount, currency } = req.body;
        const idempotencyKey = req.headers['x-idempotency-key'];

        // HTTP Concern: Reject early if parameters violate API rules
        if (!idempotencyKey) {
            return res.status(400).json({ 
                error: "Bad Request", 
                message: "Missing x-idempotency-key header" 
            });
        }

        const { data, status } = await paymentService.processPayment(amount, currency, idempotencyKey);
        
        return res.status(status).json(data);
    } catch (error) {
        next(error);
    }
};

const getPayments = async (req, res, next) => {
    try {
        const history = await paymentService.getPaymentHistory();
        
        return res.status(200).json({
            data: history,
            total_count: history.length
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { handlePayment ,getPayments };