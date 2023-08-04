import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import { Toaster } from "react-hot-toast";
import Main from "./pages/Main";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import OrderDetail from "./pages/OrderDetail";
import Settings from "./pages/Settings";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import About from "./pages/About";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProductDetail from "./pages/ProductDetail";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
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
        { path: "/cart", element: <Cart /> },
        { path: "/menu", element: <Menu /> },
        { path: "/menu/:productId", element: <ProductDetail /> },
        { path: "/login", element: <Login /> },
        { path: "/contact", element: <Contact /> },
        { path: "/order", element: <Order /> },
        { path: "/order/:orderId", element: <OrderDetail /> },
        { path: "/settings", element: <Settings /> },
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
