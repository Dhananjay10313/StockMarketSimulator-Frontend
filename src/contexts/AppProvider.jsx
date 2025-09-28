import * as React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import { Article } from "@mui/icons-material";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { Outlet } from "react-router";
import { createTheme } from "@mui/material/styles";

const NAVIGATION = [
  { kind: "header", title: "Main" },
  { segment: "dashboard", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "orders", title: "Orders", icon: <ShoppingCartIcon /> },
  { segment: "news", title: "News", icon: <Article /> },
  { segment: "history", title: "history", icon: <HistoryIcon /> },
];

const BRANDING = {
  // Replace with stock market logo if desired
  // logo: <img src="/logo.svg" alt="Logo" />,
  title: "Stock Market Simulator",
  homeUrl: "/dashboard",
};

const theme = createTheme({
  cssVariables: { colorSchemeSelector: "data-toolpad-color-scheme" },
  breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 } },
});

export default function AppLayout() {
  return (
    <ReactRouterAppProvider
      navigation={NAVIGATION}
      branding={BRANDING}
      theme={theme}
    >
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </ReactRouterAppProvider>
  );
}