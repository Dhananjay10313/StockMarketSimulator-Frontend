import { createBrowserRouter, RouterProvider } from 'react-router';
import AppLayout from './contexts/AppProvider.jsx';
import DashboardPage from './pages/DashboardPage';
import { useLocation } from 'react-router';
// import OrdersPage from './pages/OrdersPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, // layout route with header/sidebar
    children: [
      { index: true, element: <DashboardPage pathname={"/dashboard"}/>}, // default to /dashboard if preferred
      { path: 'dashboard', element: <DashboardPage pathname={"dasboa"}/> },
      { path: 'orders', element: <DashboardPage pathname={"useLocation()"}/> }, // replace with <OrdersPage /> when ready
    ],
  },
]);


function App() {
 

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
