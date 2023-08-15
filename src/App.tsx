import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import AppLayout from "./ui/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import Main from "./pages/Main";
import Order from "./pages/Order";
import OrderDetail from "./pages/OrderDetail";
import Settings from "./pages/Settings";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import Admin from "./pages/Admin";
import ProtectedRoutes from "./ui/ProtectedRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 15 * 1000,
    },
  },
});
const App = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <Main /> },
        { path: "/about", element: <About /> },
        { path: "/menu", element: <Menu /> },
        { path: "/menu/:productId", element: <ProductDetail /> },
        { path: "/login", element: <Login /> },
        { path: "/contact", element: <Contact /> },
        { path: "/order/:orderId", element: <OrderDetail /> },
        {
          path: "/admin",
          element: (
            <ProtectedRoutes>
              <Admin />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/admin/settings",
          element: (
            <ProtectedRoutes>
              <Settings />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/admin/order",
          element: (
            <ProtectedRoutes>
              <Order />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "##e2e8f0",
            color: "#020617",
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;
