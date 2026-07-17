const express = require('express');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const userRoutes = require('./modules/user/user.routes');
const paymentRoutes = require('./modules/payment/payment.routes');

const app = express();

app.use(express.json());

// Apply global rate limiting to all API entries
app.use('/api', rateLimiter);

// Mount feature routers
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);

// Always register the global error handler LAST
app.use(errorHandler);

module.exports = app;