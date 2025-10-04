## Backend Coding Challenge — Airport Lookup API (by Taslim Owolarafe)

#### This submission implements the backend challenge for Tilla Technologies, focusing on airport data optimization and lookup functionality.
The goal was to move airport data from a static JSON file to a database, expose efficient search endpoints, and fix the Seaport resolver bug.

### Summary of Work

#### -  Fixed Seaport Resolver Bug
Resolved an issue where getSeaport failed when a port’s location was missing by adding proper null handling and default fallback values.

#### - Optimized Airport Data Handling
Moved the airport dataset from the frontend JSON file into a SQLite database using Prisma ORM.

#### - Implemented Airport Lookup Endpoint
Added an endpoint (via GraphQL/NestJS) that allows searching airports by name, IATA code, city, or country.

#### - Database Migration & Seeding
Created Prisma schema and migrations. Seeded the SQLite database from frontend/data/airport.json.

### Stack Used

- NestJS

- GraphQL

- Prisma ORM

- SQLite (for simplicity and portability)

- TypeScript

### Setup & Running the Application

Note: SQLite was used for this submission for easy local setup.

## Installation & Running

#### - Install dependencies
- From the project root:

```bash
yarn install
 ```

- Set up environment variables
Create a .env file in the backend folder:

```bash  
DATABASE_URL="file:./dev.db"
```

- Run database migrations

```bash
yarn workspace backend prisma migrate dev
```

- Generate Prisma client

```bash
yarn workspace backend prisma generate
```

- Seed the database

```bash
 yarn workspace backend prisma db seed
```

- Start the server

```bash
yarn start
```

### Application URLs

Backend GraphQL Playground: http://localhost:3001/graphql
Frontend: http://localhost:3000

<img width="1898" height="909" alt="image" src="https://github.com/user-attachments/assets/01dcd97d-a661-4197-a329-830734dceec9" />
<img width="1918" height="909" alt="image" src="https://github.com/user-attachments/assets/7885bd0c-d330-4092-8a9e-3547a0b34351" />
<img width="1917" height="904" alt="image" src="https://github.com/user-attachments/assets/b95a8809-9a6e-49b8-adfd-6ee053495a25" />


### Extra Questions

1️ - Edge cases before production

- Ensure case-insensitive and partial search matching.

- Validate query inputs to prevent malformed or empty search queries.

- Add error handling for unavailable airport or database connection failures.

- Use pagination for large datasets and caching for frequent queries.

2️ - Scaling for high traffic

- Migrate from SQLite to PostgreSQL (as used at Tilla).

- Add proper indexing on iata, name, city, and country.

- Introduce Redis or similar caching layer for repeated queries.

- Deploy on AWS ECS/Lambda with connection pooling and read replicas.

3️ - Working well in a fully remote team

- Maintain clear async communication and concise PR descriptions.

- Write well-documented commits and code comments.

- Embrace ownership, transparency, and quick feedback loops.

- Regularly sync with the team on blockers and progress updates.
