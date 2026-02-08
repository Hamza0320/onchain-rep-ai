# 🧠 On-Chain AI Reputation System

An analyst-grade Web3 application that generates **AI-powered reputation reports for blockchain wallets** using on-chain behavior.

This project combines:
- **Blockchain data** (wallet activity)
- **Deterministic metrics extraction**
- **AI analysis** (LLM-based interpretation)
- **A clean frontend dashboard** suitable for Web3 teams, protocols, or risk analysts

---

## ✨ What This App Does

Given a wallet address, the system:

1. Fetches on-chain activity
2. Computes structured behavioral metrics
3. Uses AI to generate a **professional reputation report**
4. Displays the result in a clean, analyst-style UI

### Example Output

- **Wallet Summary**  
  A concise professional interpretation of wallet behavior

- **Risk Level**  
  Low / Medium / High (with justification)

- **Behavior Tags**  
  e.g. `New User`, `DeFi Participant`, `Low Activity`

- **Raw Metrics**
  - Wallet age
  - Transaction count
  - Contract interactions
  - Activity timestamps

---

## 🧱 Tech Stack

### Backend
- Node.js + TypeScript
- Express
- OpenAI API
- Alchemy (or other RPC provider)

### Frontend
- React
- TypeScript
- Tailwind CSS
- TanStack React Query
- Vite

### Architecture
- Monorepo-style layout
- Clean separation of concerns
- No frontend hacks or hardcoded logic

---

## 📁 Project Structure

```txt
onchain-rep-ai/
│
├── backend/
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── services/      # AI, blockchain, metrics logic
│   │   ├── types/         # Shared types
│   │   └── server.ts
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── hooks/         # Data fetching logic
│   │   ├── pages/         # App pages
│   │   └── main.tsx
│   └── package.json
│
└── README.md
```

### Prerequisites
Before starting, install:

- Node.js (v18+ recommended)

- npm or pnpm

- An OpenAI API key

- An Alchemy API key (or compatible RPC)


### Environment Variables

Create a .env file:
```
OPENAI_API_KEY=sk-...
ALCHEMY_API_KEY=your_alchemy_key
PORT=4000
```

# 🚀 Getting Started

1️⃣ Install dependencies

From the project root:
```
cd backend
npm install

cd ../frontend
npm install
```

2️⃣ Start the backend
```
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 4000
```

Test it:
```
http://localhost:4000/health
```
Expected response:
```
Server is healthy ✅
```
3️⃣ Start the frontend
```
cd frontend
npm run dev
```

Go to:
```
http://localhost:3000
```

# 🧪 How to Use the App
