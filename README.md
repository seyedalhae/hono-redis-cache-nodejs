# Hono Redis Cache NodeJS

A Node.js application using Hono framework with Redis caching.

## Prerequisites

- Node.js 16+ 
- MySQL Server
- Redis Server
- npm or yarn

## Redis Installation

### Windows
1. Download Redis for Windows from [GitHub Redis Releases](https://github.com/microsoftarchive/redis/releases)
2. Run the installer (Redis-x64-xxx.msi)
3. Verify installation:
```bash
redis-cli ping
```

### macOS
```bash
brew install redis
brew services start redis
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install redis-server
sudo systemctl start redis.service
```

## Installation

You can use either npm or Yarn to install the dependencies.

### Using npm

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Using Yarn

```bash
# Install dependencies
yarn

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
DATABASE_URL="mysql://root:@localhost:3306/hono-redis-cache-nodejs"
```

## Project Setup

1. Clone the repository:
```bash
git clone https://github.com/seyedalhae/hono-redis-cache-nodejs
cd hono-redis-cache-nodejs
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
- Copy `.env.example` to `.env`
- Update the following variables:
```properties
PORT=3000
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
DATABASE_URL="mysql://root:@localhost:3306/hono-redis-cache-nodejs"
```

4. Setup database:
```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate
```

## Running the Application

### Development mode
```bash
npm run dev
```

### Production mode
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /auth/auth` - Register/Login
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password

### Products
- `GET /products` - List all products (cached)
- `GET /products/:id` - Get single product (cached)

### Cart (Protected Routes)
- `GET /cart` - View cart contents
- `POST /cart/add` - Add item to cart

## Development Tools

- Prisma Studio (Database GUI):
```bash
npm run prisma:studio
```

## Technologies Used

- [Hono.js](https://hono.dev) - Fast web framework
- [Redis](https://redis.io) - In-memory caching
- [Prisma](https://www.prisma.io) - ORM
- [MySQL](https://www.mysql.com) - Database
- [JWT](https://jwt.io) - Authentication

## License

MIT