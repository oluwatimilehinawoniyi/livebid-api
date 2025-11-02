# LiveBid API

Real-time auction platform where users bid on items, with automatic payment processing when auctions end.

## What This Is

Backend API for an auction system. Users can create auctions, place bids in real-time via WebSockets, and winners get charged automatically through Paystack.

Built to learn WebSockets, Redis patterns, and payment processing - not just another CRUD app.

## Tech Stack

- **NestJS** - Because TypeScript + decorators = Spring Boot vibes
- **PostgreSQL** - Relational data (auctions, users, bids)
- **TypeORM** - Migrations and entities
- **Redis** - Caching, pub/sub, distributed locks
- **Socket.io** - Real-time bidding
- **Paystack** - Payment processing
- **Bull** - Job queues for scheduled tasks
- **Docker** - Local development

<!-- ## Current Status

**Completed:**

- ✅ User registration & login (bcrypt password hashing)
- ✅ Auction CRUD operations
- ✅ Database migrations
- ✅ Docker setup

**In Progress:**

- 🔨 JWT authentication
- 🔨 WebSocket bidding
- 🔨 Payment integration -->

## Getting Started

### Prerequisites

- Node.js 18+
- Docker Desktop
- pnpm (or npm)

### Installation

```bash
# Clone repo
git clone https://github.com/oluwatimilehinawoniyi/livebid-api.git
cd livebid-api

# Install dependencies
pnpm install

# Copy env file
cp .env.example .env

# Start database & redis
docker-compose up -d

# Run migrations
pnpm run build
pnpx typeorm migration:run -d dist/data-source.js

# Start dev server
pnpm run start:dev
```

Server runs on `http://localhost:3000`

### Database Commands

```bash
# Generate migration after entity changes
pnpx typeorm migration:generate src/migrations/MigrationName -d dist/data-source.js

# Run migrations
pnpx typeorm migration:run -d dist/data-source.js

# Revert last migration
pnpx typeorm migration:revert -d dist/data-source.js

# Check database tables
docker exec -it livebid-postgres psql -U livebid -d livebid_dev -c "\dt"
```

## API Endpoints

### Authentication

**Register**

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "bidder"
}
```

**Login**

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

### Auctions

**Create Auction**

```http
POST /auctions
Content-Type: application/json

{
  "title": "Vintage Guitar",
  "description": "1960s Fender Stratocaster",
  "startPrice": 1000,
  "startTime": "2025-11-10T10:00:00Z",
  "endTime": "2025-11-15T10:00:00Z"
}
```

**Get All Auctions**

```http
GET /auctions
```

**Get Single Auction**

```http
GET /auctions/{id}
```

**Update Auction**

```http
PATCH /auctions/{id}
Content-Type: application/json

{
  "title": "Updated Title"
}
```

**Delete Auction**

```http
DELETE /auctions/{id}
```

## Project Structure

```
src/
├── auction/
│   ├── dto/
│   ├── entities/
│   ├── auction.controller.ts
│   ├── auction.service.ts
│   └── auction.module.ts
├── user/
│   ├── dto/
│   ├── entities/
│   ├── user.controller.ts
│   ├── user.service.ts
│   └── user.module.ts
├── migrations/
├── app.module.ts
└── main.ts
```

Each feature is a module with its own controllers, services, and entities.

<!-- Like a Spring Boot modulith but with explicit `@Module` declarations.

## What's Coming

**Weekend 2:** JWT authentication + route guards
**Weekend 3:** WebSocket setup + real-time bid broadcasting
**Weekend 4:** Redis distributed locks (prevent race conditions)
**Weekend 5:** Auto-bid system (proxy bidding)
**Weekend 6:** Paystack payment integration
**Weekend 7:** RBAC + admin features
**Weekend 8:** Testing + deployment -->

## Why I Built This

- Learn real-time systems (WebSockets)
- Master Redis patterns beyond basic caching
- Implement payment flows with escrow logic
- Build something more complex than CRUD
- Practice system design for interviews

## License

MIT - do whatever you want with it

---

Built by Oluwatimilehin Awoniyi | [GitHub](https://github.com/oluwatimilehinawoniyi) | [LinkedIn](https://www.linkedin.com/in/oluwatimilehin-awoniyi/)
