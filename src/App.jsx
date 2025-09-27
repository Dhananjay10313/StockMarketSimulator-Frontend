import { createBrowserRouter, RouterProvider } from "react-router";
import AppLayout from "./contexts/AppProvider.jsx";
import DashboardPage from "./pages/dashboardpage/DashboardPage.jsx";
import OrderPage from "./pages/orderpage/OrderPage.jsx";
import NewsPage from "./components/newscomponent/News.jsx";
import HistoryPage from "./pages/historypage/HistoryPage.jsx";
// import OrdersPage from './pages/OrdersPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />, // layout route with header/sidebar
    children: [
      { index: true, element: <DashboardPage pathname={"/dashboard"} /> }, // default to /dashboard if preferred
      { path: "dashboard", element: <DashboardPage pathname={"dasboa"} /> },
      { path: "orders", element: <OrderPage /> },
      { path: "history", element: <HistoryPage /> },
      { path: "news", element: <NewsPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
