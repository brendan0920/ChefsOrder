# ChefsOrder

A web application for chefs to streamline ingredient ordering across multiple vendors.

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: .NET 8, Entity Framework Core, SQL Server

## Project Structure

```
├── frontend/               # Next.js frontend
│   ├── app/                # Pages (Next.js App Router)
│   ├── components/
│   │   ├── ui/             # Design system (Button, Card, Input)
│   │   ├── layout/         # TopNav, Footer, UserDropdown
│   │   └── [feature]/      # Feature components
│   ├── lib/
│   │   ├── api/            # API client
│   │   ├── utils.ts        # Utility functions
│   │   └── constants.ts    # App constants
│   ├── hooks/              # Custom React hooks
│   ├── types/              # TypeScript types
│   └── data/               # Mock data (dev only)
│
└── backend/                # .NET Core API
    ├── Controllers/        # API endpoints
    ├── Services/           # Business logic
    ├── Models/             # Domain models
    ├── DTOs/               # Data transfer objects
    └── Data/               # Database context
```

## Getting Started

### Prerequisites

- Node.js 18+
- .NET 8 SDK
- SQL Server (LocalDB or full)

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

### Backend

```bash
cd backend
dotnet restore
dotnet run
```

API runs at http://localhost:5000  
Swagger UI at http://localhost:5000/swagger

## Features

- **Order Management**: Create, track, and manage ingredient orders
- **Vendor Management**: Manage vendor relationships and contacts
- **Order History**: View past orders with filters
- **Messaging**: Communicate with vendors

## API Integration

The frontend uses mock data by default. To switch to the real API:

1. Start the backend server
2. Set `NEXT_PUBLIC_API_URL=http://localhost:5000/api` in `.env.local`
3. Replace `mockData` imports with API calls from `lib/api/client.ts`

## Development

### Frontend Commands

```bash
npm run dev     # Start dev server
npm run build   # Production build
npm run lint    # Run ESLint
```

### Backend Commands

```bash
dotnet run      # Start server
dotnet build    # Build project
dotnet test     # Run tests
```

## License

MIT
