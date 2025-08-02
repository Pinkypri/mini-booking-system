# Mini Booking System - Backend API

A robust Node.js backend API for a mini booking system built with Express.js, TypeScript, and PostgreSQL.

## 🚀 Features

- **Authentication & Authorization**: JWT-based user authentication
- **Slot Management**: Create, read, booking slots
- **Booking System**: Complete booking management with seat selection
- **Database Integration**: PostgreSQL with TypeORM
- **Security**: Helmet, CORS, and input validation
- **Logging**: Winston logger for comprehensive logging
- **Type Safety**: Full TypeScript implementation

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet, CORS, bcryptjs
- **Validation**: express-validator
- **Logging**: Winston, Morgan
- **Development**: ts-node-dev

## 📁 Project Structure

```
server/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.ts  # Database connection setup
│   │   └── env.ts       # Environment variables
│   ├── controllers/     # Route controllers
│   │   ├── auth.controller.ts
│   │   ├── booking.controller.ts
│   │   └── slot.controller.ts
│   ├── interfaces/      # TypeScript interfaces
│   ├── middlewares/     # Express middlewares
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── models/          # Database models
│   │   ├── User.ts
│   │   ├── Slot.ts
│   │   └── Booking.ts
│   ├── routes/          # API routes
│   │   ├── auth.routes.ts
│   │   ├── booking.routes.ts
│   │   └── slot.routes.ts
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   ├── app.ts           # Express app configuration
│   └── server.ts        # Server entry point
├── .env                 # Environment variables
├── package.json
└── tsconfig.json
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Clone and Install Dependencies

```bash
cd server
npm install
```

### 2. Environment Configuration

Create a `.env` file in the server root directory:

```env
# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=booking_system

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=1d
```

### 3. Database Setup

1. Create a PostgreSQL database named `booking_system`
2. The application will automatically create tables on first run (synchronize: true)

### 4. Run the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /register` - User registration
- `POST /login` - User login
- `POST /forgot-password` - Password reset request

### Slot Routes (`/api/slots`)

- `GET /` - Get all available slots
- `POST /` - Create new slot (admin)
- `PUT /:id` - Update slot (admin)


### Booking Routes (`/api/bookings`)

- `GET /` - Get user bookings
- `POST /` - Create new booking
- `GET /:id` - Get specific booking


### Health Check

- `GET /api/health` - Server health status

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```


## 🧪 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## 🔒 Security Features

- **Helmet**: Sets various HTTP headers for security
- **CORS**: Configurable cross-origin resource sharing
- **Input Validation**: express-validator for request validation
- **Password Hashing**: bcryptjs for secure password storage
- **JWT Authentication**: Secure token-based authentication

## 📝 Logging

The application uses Winston for logging with different log levels:
- Error logs: `error.log`
- Combined logs: `combined.log`
- Console output in development mode

## 🚀 Deployment

1. Build the application: `npm run build`
2. Set production environment variables
3. Ensure PostgreSQL is running and accessible
4. Start the server: `npm start`

## 📄 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**: Verify PostgreSQL is running and credentials are correct
2. **Port Already in Use**: Change the PORT in `.env` file
3. **JWT Secret**: Ensure JWT_SECRET is set in environment variables

### Support

For issues and questions, please create an issue in the repository.