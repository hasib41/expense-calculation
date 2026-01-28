# 💰 Expense Tracker for Software Companies

A simple, clean expense tracking application built with modern technologies for managing software company expenses.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

## ✨ Features

- 📊 **Dashboard** - Overview with total expenses, count, and average statistics
- 💰 **Expense Management** - Add, edit, and delete expenses with ease
- 🏷️ **Categories** - Organize expenses with customizable categories
- 🔍 **Advanced Filtering** - Filter by date range, category, amount, and search
- 📱 **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TypeScript, Tailwind CSS, Vite |
| **Backend** | Express.js, TypeScript, Node.js |
| **Database** | Supabase (PostgreSQL) |

## 📁 Project Structure

```
expense-calculation/
├── 📂 server/                    # Backend API
│   ├── src/
│   │   ├── config/              # Supabase configuration
│   │   │   └── supabase.ts
│   │   ├── routes/              # API endpoints
│   │   │   ├── expenses.ts      # CRUD + filtering
│   │   │   └── categories.ts
│   │   ├── types/               # TypeScript interfaces
│   │   │   └── index.ts
│   │   └── index.ts             # Express server
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── 📂 client/                    # Frontend App
│   ├── src/
│   │   ├── api/                 # API client
│   │   │   └── expenses.ts
│   │   ├── components/          # React components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── FilterPanel.tsx
│   │   │   ├── ExpenseList.tsx
│   │   │   ├── ExpenseForm.tsx
│   │   │   └── CategoryManager.tsx
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── supabase-schema.sql          # Database schema
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### 1. Clone the Repository

```bash
git clone https://github.com/hasib41/expense-calculation.git
cd expense-calculation
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the schema:

```sql
-- Run the contents of supabase-schema.sql
```

Or copy and paste the SQL from `supabase-schema.sql` directly.

3. Get your credentials from **Settings > API**:
   - Project URL
   - anon public key

### 3. Configure Environment Variables

**Backend:**
```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3001
```

### 4. Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 5. Run the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser! 🎉

## 📡 API Reference

### Expenses

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/expenses` | Get all expenses (with filters) |
| `GET` | `/api/expenses/:id` | Get single expense |
| `POST` | `/api/expenses` | Create expense |
| `PUT` | `/api/expenses/:id` | Update expense |
| `DELETE` | `/api/expenses/:id` | Delete expense |
| `GET` | `/api/expenses/stats/summary` | Get statistics |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/categories` | Get all categories |
| `POST` | `/api/categories` | Create category |
| `DELETE` | `/api/categories/:id` | Delete category |

### Filter Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `startDate` | `string` | Filter from date (YYYY-MM-DD) |
| `endDate` | `string` | Filter to date (YYYY-MM-DD) |
| `category` | `string` | Filter by category ID |
| `minAmount` | `number` | Minimum amount |
| `maxAmount` | `number` | Maximum amount |
| `search` | `string` | Search in title |

**Example:**
```
GET /api/expenses?startDate=2024-01-01&category=uuid&minAmount=100
```

## 🏷️ Default Categories

The schema includes these pre-configured categories for software companies:

- Salaries
- Cloud Services
- Software Licenses
- Marketing
- Office Supplies
- Travel
- Utilities
- Contractors
- Hardware
- Training
- Other

## 🔒 Security (Optional)

For production, enable Row Level Security in Supabase:

```sql
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
```

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with ❤️ using React, Express, and Supabase
