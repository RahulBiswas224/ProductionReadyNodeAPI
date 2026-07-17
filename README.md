# Enterprise-Grade Node.js REST API

A production-ready REST API demonstrating scalable backend patterns, clean architecture, and defensive programming in Node.js.

Rather than relying on basic CRUD operations and "fat controllers," this project implements enterprise-level solutions to common distributed system problems, including network retries, dataset scaling, and API abuse.

## ✨ Key Architectural Features

- **Controller-Service-Repository (CSR) Pattern**: Strict 3-tier architecture. HTTP concerns (Controllers) are 100% decoupled from business logic (Services), which are decoupled from data access (Repositories).
- **Robust Persistence Layer**: Fully migrated to PostgreSQL using the Prisma 7 ORM. Utilizes advanced connection pooling and separate direct database drivers for high-performance, serverless-ready operations.
- **Idempotent Transactions**: The `POST /api/payments` endpoint implements idempotency keys. If a client experiences a network drop and retries a payment, the API intercepts the duplicate request via caching and safely returns the original response, preventing double-charges.
- **Cursor Pagination**: The `GET /api/users` endpoint utilizes cursor-based pagination. Unlike `OFFSET` which degrades at scale, cursors provide $O(1)$ database querying, making it suitable for infinite-scroll feeds on massive datasets.
- **Global Rate Limiting**: Custom middleware implementing a Token Bucket-style tracking system to prevent API abuse and DDOS attacks per IP address.
- **Isolated Unit Testing**: Business logic is tested using Jest. The Repository layer is completely mocked, ensuring tests run in milliseconds without requiring an active database or network connection.

## 📂 Project Structure

```
src/
├── config/                 # Database and ORM configuration
├── middlewares/            # Reusable Express logic (Rate Limiting, Error Handling)
├── modules/                # Feature-based domain organization
│   ├── payment/
│   │   ├── payment.routes.js     # Route definitions
│   │   ├── payment.controller.js # HTTP parsing & validation
│   │   ├── payment.service.js    # Core business logic (Idempotency rules)
│   │   ├── payment.repository.js # Data access abstraction
│   │   └── payment.service.test.js # Jest unit tests
│   └── user/
│       ├── user.routes.js
│       ├── user.controller.js
│       ├── user.service.js
│       └── user.repository.js
├── app.js                  # Express app configuration & global middleware
└── server.js               # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL Database (e.g., Neon.tech)

### Installation

Clone the repository:

```bash
git clone https://github.com/RahulBiswas224/ProductionReadyNodeAPI.git
cd ProductionReadyNodeAPI
```

Install dependencies:

```bash
npm install
```

Configure your `.env` file with your `DATABASE_URL` and `DIRECT_URL`, then run the database migration:

```bash
npx prisma migrate dev --name init
```

Run the development server:

```bash
npm run dev
```

## 🧪 Testing

This project utilizes Jest for unit testing. Because of the strict CSR architecture, services are tested in total isolation by mocking the repository layer.

```bash
# Run the test suite
npm test
```

## 📡 API Reference

### 1. Cursor Pagination (Users)

Fetches a list of users using a high-performance cursor pointer instead of an offset.

**Request:**

```
GET /api/users?limit=3&cursor=0
```

**Response:**

```json
{
  "data": [
    { "id": 1, "name": "User 1" },
    { "id": 2, "name": "User 2" },
    { "id": 3, "name": "User 3" }
  ],
  "meta": {
    "next_cursor": 3,
    "has_more": true
  }
}
```

### 2. Idempotent Payment Processing

Simulates a transaction. Sending the exact same request twice with the same `x-idempotency-key` will result in a `200 OK` cache hit rather than a duplicate `201 Created` charge.

**Request:**

```
POST /api/payments

Headers:
  x-idempotency-key: unique-uuid-12345
  Content-Type: application/json

Body:
{
  "amount": 50,
  "currency": "USD"
}
```

## 🗺️ Roadmap & Next Steps

- [x] **Database Migration**: Completed. Integrated PostgreSQL using Prisma 7 ORM with connection pooling via Neon.tech.
- [ ] **Redis Caching**: Move the Rate Limiter and Idempotency caches to an external Redis cluster for horizontal scaling.
- [ ] **Dockerization**: Containerize the API, PostgreSQL, and Redis into a unified `docker-compose.yml` environment.
