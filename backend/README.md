# LevelUpX Backend API

This is a standalone Node.js + Express + MySQL backend for LevelUpX.

## Features
- REST API endpoints for user data
- MySQL connection pool
- CORS enabled

## Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   # or
   pnpm install
   ```

2. **Configure MySQL:**
   - Make sure your MySQL server is running and accessible.
   - Update the connection details in `index.js` if needed (host, user, password, database).
   - Ensure a `users` table exists in your `levelupx` database.

3. **Run the server:**
   ```bash
   npm start
   # or
   pnpm start
   ```

4. **API Endpoints:**
   - `GET /api/data` — fetch all users
   - `POST /api/data` — insert a new user (expects `{ name, email }` in JSON body)

## Example cURL
```bash
curl http://localhost:5000/api/data

curl -X POST http://localhost:5000/api/data \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "email": "alice@example.com"}'
``` 