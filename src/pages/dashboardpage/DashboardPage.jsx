// DashboardPage.jsx
import Box from "@mui/material/Box";
import "./index.css";
import Typography from "@mui/material/Typography";

import Watchlist from "../../components/dashboardcomponents/WatchList.jsx";
import LeaderboardTable from "../../components/dashboardcomponents/LeaderboardTable.jsx";
import PortfolioCard from "../../components/dashboardcomponents/PortfolioCard.jsx";
import PortfolioLineChart from "../../components/dashboardcomponents/PortfoliolineChart.jsx";


// --- sample data (keep your existing data) ---
const data = [
  { symbol: "SPOT", name: "Spotify", price: 310.4, changePercent: -1.1 },
  { symbol: "ABNB", name: "Airbnb", price: 132.72, changePercent: -10.29 },
  { symbol: "SHOP", name: "Shopify", price: 28.57, changePercent: -6.48 },
  { symbol: "SONY", name: "PlayStation", price: 71.86, changePercent: 0.98 },
  { symbol: "DBX", name: "Dropbox", price: 20.44, changePercent: -3.08 },
  { symbol: "PYPL", name: "PayPal", price: 87.66, changePercent: -3.86 },
];

const rows = [
  { rank: 1, username: "alpha", portfolioValue: 152340.12, walletBalance: 1200.5, totalValue: 153540.62 },
  { rank: 2, username: "bravo", portfolioValue: 149120.7, walletBalance: 900.0, totalValue: 150020.7 },
  { rank: 3, username: "charlie", portfolioValue: 98000.0, walletBalance: 450.0, totalValue: 98450.0 },
  // ...more rows
];

const now = Date.now();
const points = Array.from({ length: 120 }, (_, i) => ({
  t: now - (120 - i) * 5 * 60 * 1000,
  v: 12000 + Math.sin(i / 6) * 300 + Math.random() * 80 - 40,
}));

const items = [
  { type: "Tech", symbol: "TECH", value: 4989.8, changePct: 1.59, color: "#f59e0b" },
  { type: "Stable", symbol: "STBL", value: 1300.0, changePct: -2.52, color: "#10b981" },
  { type: "Growth", symbol: "GRTH", value: 1300.0, changePct: -0.05, color: "#ef4444" },
];

export default function DemoPageContent() {
  return (
    // Page wrapper with subtle gray background so cards “float”
    <Box
      sx={{ bgcolor: "#f5f7fb", minHeight: "100dvh", width: "100%", py: 3, px: { xs: 2, md: 4 } }}
    >
      <Box sx={{ maxWidth: 1240, mx: "auto", display: "grid", gap: 3 }}>
        {/* comp1: Line chart + Portfolio card side by side */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
            alignItems: "stretch",
          }}
        >
          <Box sx={{ p: 0 }}>
            <PortfolioLineChart points={points} />
          </Box>
          <Box sx={{ p: 0 }}>
            <PortfolioCard title="Total Portfolio" items={items} overallChangePct={-0.72} />
          </Box>
        </Box>

        {/* comp2: Leaderboard + Watchlist side by side */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
            alignItems: "start",
          }}
        >
          <Box sx={{ p: 0 }}>
            <LeaderboardTable data={rows} />
          </Box>
          <Box sx={{ p: 0 }}>
            <Watchlist items={data} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
