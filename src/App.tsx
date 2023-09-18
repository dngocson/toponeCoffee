import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
import ProtectedRoutes from "./ui/ProtectedRoutes";
import Spinner from "./ui/Spinner";
import AppLayout from "./ui/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import Main from "./pages/Main";
// import Dashboard from "./pages/Dashboard";
// import OrderDetail from "./pages/OrderDetail";
// import Menu from "./pages/Menu";
// import Order from "./pages/Order";
// import Login from "./pages/Login";
// import About from "./pages/About";
// import Settings from "./pages/Settings";
// import ProductDetail from "./pages/ProductDetail";
// import Contact from "./pages/Contact";
// import Admin from "./pages/Admin";
// import FindOrder from "./pages/FindOrder";

const Order = lazy(() => import("./pages/Order"));
const Login = lazy(() => import("./pages/Login"));
const About = lazy(() => import("./pages/About"));
const Settings = lazy(() => import("./pages/Settings"));
const Contact = lazy(() => import("./pages/Contact"));
const Admin = lazy(() => import("./pages/Admin"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const FindOrder = lazy(() => import("./pages/FindOrder"));
const Menu = lazy(() => import("./pages/Menu"));
const OrderDetail = lazy(() => import("./pages/OrderDetail"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
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
        {
          path: "/about",
          element: (
            <Suspense fallback={<Spinner />}>
              <About />
            </Suspense>
          ),
        },
        {
          path: "/menu",
          element: (
            <Suspense fallback={<Spinner />}>
              <Menu />
            </Suspense>
          ),
        },
        {
          path: "/menu/:productId",
          element: (
            <Suspense fallback={<Spinner />}>
              <ProductDetail />
            </Suspense>
          ),
        },
        {
          path: "/login",
          element: (
            <Suspense fallback={<Spinner />}>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "/contact",
          element: (
            <Suspense fallback={<Spinner />}>
              <Contact />
            </Suspense>
          ),
        },
        {
          path: "/order/:orderId",
          element: (
            <Suspense fallback={<Spinner />}>
              <OrderDetail />
            </Suspense>
          ),
        },
        {
          path: "/find",
          element: (
            <Suspense fallback={<Spinner />}>
              <FindOrder />
            </Suspense>
          ),
        },
        {
          path: "/admin",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Spinner />}>
                <Admin />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "/admin/settings",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Spinner />}>
                <Settings />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "/admin/order",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Spinner />}>
                <Order />
              </Suspense>
            </ProtectedRoutes>
          ),
        },
        {
          path: "/admin/dashboard",
          element: (
            <ProtectedRoutes>
              <Suspense fallback={<Spinner />}>
                <Dashboard />
              </Suspense>
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
