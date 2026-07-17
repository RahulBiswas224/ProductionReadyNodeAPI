// src/modules/payment/payment.service.test.js

// 1. Import the service we want to test
const paymentService = require('./payment.service');

// 2. Import the repository so we can mock it
const paymentRepository = require('./payment.repository');

// 3. Tell Jest to intercept ALL functions inside payment.repository.js
jest.mock('./payment.repository');

describe('Payment Service', () => {
    
    // Clear the mocks before every single test so they don't bleed together
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should process a new payment when the idempotency key is not cached', async () => {
        // Arrange: Tell our fake repository exactly what to return when asked
        // We simulate a cache MISS by returning null
        paymentRepository.getCachedTransaction.mockResolvedValue(null);
        paymentRepository.saveTransactionToCache.mockResolvedValue();

        // Act: Run the actual service function
        const amount = 50;
        const currency = 'USD';
        const key = 'new-key-123';
        const response = await paymentService.processPayment(amount, currency, key);

        // Assert: Did the service do the right math and return the right status?
        expect(response.status).toBe(201);
        expect(response.data.amount).toBe(50);
        expect(response.data.status).toBe('SUCCESS');
        
        // Assert: Did the service call the repository with the right arguments?
        expect(paymentRepository.getCachedTransaction).toHaveBeenCalledWith('new-key-123');
        expect(paymentRepository.saveTransactionToCache).toHaveBeenCalledTimes(1);
    });


    it('should NOT process a payment if the idempotency key is already cached', async () => {
        // Arrange: Simulate a cache HIT
        const fakeCachedRecord = { 
            transactionId: 'abc-123', 
            amount: 50, 
            status: 'SUCCESS' 
        };
        paymentRepository.getCachedTransaction.mockResolvedValue(fakeCachedRecord);

        // Act: Run the service function
        const response = await paymentService.processPayment(50, 'USD', 'used-key-456');

        // Assert: The service should return 200 OK, not 201 Created
        expect(response.status).toBe(200);
        
        // Assert: The service MUST NOT try to save a new record
        expect(paymentRepository.saveTransactionToCache).toHaveBeenCalledTimes(0);
        
        // Assert: The service should just return the cached data
        expect(response.data.transactionId).toBe('abc-123');
    });
});