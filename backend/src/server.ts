/**
 * The main entry point of the backend server.
 * 1. Start an Express server
 * 2. Register middleware
 * 3. Connect API routes
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import walletRoutes from "./routes/wallet";

dotenv.config(); // Load environment variables like API keys

const app = express();

app.get("/health", (req, res) => {
    res.send("Server is healthy ✅");
});

// Cross-origin requests so the frontend can talk to me
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Attach wallet-related routes under /api/wallet
app.use("/api/wallet", walletRoutes);

// Listening for requests
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
