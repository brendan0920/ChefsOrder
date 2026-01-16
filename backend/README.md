# ChefsOrder API

ASP.NET Core Web API backend for the ChefsOrder application.

## Prerequisites

- .NET 8.0 SDK or later
- SQL Server (LocalDB or SQL Server Express)
- Visual Studio 2022 or Visual Studio Code

## Getting Started

1. Restore NuGet packages:
```bash
dotnet restore
```

2. Update the connection string in `appsettings.json` if needed (default uses LocalDB)

3. Run the application:
```bash
dotnet run
```

The API will be available at:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`

Swagger UI will be available at `https://localhost:5001/swagger` in development mode.

## Database

The application uses Entity Framework Core with SQL Server. The database will be automatically created on first run using `EnsureCreated()`.

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Vendors
- `GET /api/vendors` - Get all vendors (optional `activeOnly` query parameter)
- `GET /api/vendors/{id}` - Get vendor by ID
- `POST /api/vendors` - Create new vendor
- `PUT /api/vendors/{id}` - Update vendor
- `DELETE /api/vendors/{id}` - Delete vendor

### Orders
- `GET /api/orders` - Get all orders (optional `userId` query parameter)
- `GET /api/orders/{id}` - Get order by ID
- `POST /api/orders` - Create new order
- `PUT /api/orders/{id}/status` - Update order status
- `DELETE /api/orders/{id}` - Delete order

### Messages
- `GET /api/messages` - Get all messages (optional `userId` or `vendorId` query parameters)
- `GET /api/messages/{id}` - Get message by ID
- `POST /api/messages` - Create new message
- `PUT /api/messages/{id}/read` - Mark message as read
- `DELETE /api/messages/{id}` - Delete message

## CORS

CORS is configured to allow requests from `http://localhost:3000` (Next.js frontend).

## Notes

- User authentication is not fully implemented yet. Currently, the API uses a default userId = 1 for orders and messages.
- Password hashing uses SHA256 (simple implementation). For production, use bcrypt or similar secure hashing.
- The database is created automatically on first run. For production, use migrations instead.
