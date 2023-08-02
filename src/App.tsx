import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import ErrorPage from "./pages/ErrorPage";
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
    </QueryClientProvider>
  );
};

export default App;
