const app = require('./app');
const PORT = 3000;

// You keep this separate from app.js so that automated testing frameworks (like Jest) 
// can import app.js without spinning up live HTTP listening ports every time.
app.listen(PORT, () => {
    console.log(`🚀 CSR-Structured Advanced REST API running on http://localhost:${PORT}`);
});