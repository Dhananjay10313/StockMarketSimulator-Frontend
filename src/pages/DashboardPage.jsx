import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Watchlist from "../components/dashboardcomponents/WatchList.jsx";
import LeaderboardTable from "../components/dashboardcomponents/LeaderboardTable.jsx";
import PortfolioCard from "../components/dashboardcomponents/PortfolioCard.jsx";

const data = [
  { symbol: "SPOT", name: "Spotify", price: 310.4, changePercent: -1.1 },
  { symbol: "ABNB", name: "Airbnb", price: 132.72, changePercent: -10.29 },
  { symbol: "SHOP", name: "Shopify", price: 28.57, changePercent: -6.48 },
  { symbol: "SONY", name: "PlayStation", price: 71.86, changePercent: 0.98 },
  { symbol: "DBX", name: "Dropbox", price: 20.44, changePercent: -3.08 },
  { symbol: "PYPL", name: "PayPal", price: 87.66, changePercent: -3.86 },
];

const rows = [
  {
    rank: 1,
    username: "alpha",
    portfolioValue: 152340.12,
    walletBalance: 1200.5,
    totalValue: 153540.62,
  },
  {
    rank: 2,
    username: "bravo",
    portfolioValue: 149120.7,
    walletBalance: 900.0,
    totalValue: 150020.7,
  },
  {
    rank: 3,
    username: "charlie",
    portfolioValue: 98000.0,
    walletBalance: 450.0,
    totalValue: 98450.0,
  },
  {
    rank: 1,
    username: "alpha",
    portfolioValue: 152340.12,
    walletBalance: 1200.5,
    totalValue: 153540.62,
  },
  {
    rank: 2,
    username: "bravo",
    portfolioValue: 149120.7,
    walletBalance: 900.0,
    totalValue: 150020.7,
  },
  {
    rank: 3,
    username: "charlie",
    portfolioValue: 98000.0,
    walletBalance: 450.0,
    totalValue: 98450.0,
  },
  {
    rank: 1,
    username: "alpha",
    portfolioValue: 152340.12,
    walletBalance: 1200.5,
    totalValue: 153540.62,
  },
  {
    rank: 2,
    username: "bravo",
    portfolioValue: 149120.7,
    walletBalance: 900.0,
    totalValue: 150020.7,
  },
  {
    rank: 3,
    username: "charlie",
    portfolioValue: 98000.0,
    walletBalance: 450.0,
    totalValue: 98450.0,
  },
  {
    rank: 1,
    username: "alpha",
    portfolioValue: 152340.12,
    walletBalance: 1200.5,
    totalValue: 153540.62,
  },
  {
    rank: 2,
    username: "bravo",
    portfolioValue: 149120.7,
    walletBalance: 900.0,
    totalValue: 150020.7,
  },
  {
    rank: 3,
    username: "charlie",
    portfolioValue: 98000.0,
    walletBalance: 450.0,
    totalValue: 98450.0,
  },
  // ...more rows
];

const items = [
  {
    type: "Tech",
    symbol: "TECH",
    value: 4989.8,
    changePct: 1.59,
    color: "#f59e0b",
  },
  {
    type: "Stable",
    symbol: "STBL",
    value: 1300.0,
    changePct: -2.52,
    color: "#10b981",
  },
  {
    type: "Growth",
    symbol: "GRTH",
    value: 1300.0,
    changePct: -0.05,
    color: "#ef4444",
  },
  {
    type: "Blue Chip",
    symbol: "BLUE",
    value: 1400.0,
    changePct: -3.47,
    color: "#facc15",
  },
  {
    type: "Blue Chip2",
    symbol: "BLUE2",
    value: 1400.0,
    changePct: -3.47,
    color: "#facc15",
  },
  {
    type: "Blue Chip2",
    symbol: "BLUE2",
    value: 1400.0,
    changePct: -3.47,
    color: "#facc15",
  },
  {
    type: "Blue Chip2",
    symbol: "BLUE2",
    value: 1400.0,
    changePct: -3.47,
    color: "#facc15",
  },
  {
    type: "Blue Chip2",
    symbol: "BLUE2",
    value: 1400.0,
    changePct: -3.47,
    color: "#facc15",
  },
  {
    type: "Blue Chip2",
    symbol: "BLUE2",
    value: 1400.0,
    changePct: -3.47,
    color: "#facc15",
  },
];

export default function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div style={{ padding: 24 }}>
        <PortfolioCard
          title="Total Portfolio"
          items={items}
          overallChangePct={-0.72}
        />
      </div>
      <LeaderboardTable data={rows} />
      <Watchlist items={data} />;
    </Box>
  );
}
