import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import PrivateRoute from "./routes/PrivateRoute";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminRoute from "./routes/AdminRoute";

import DashboardPage from "./pages/DashboardPage";
import ProductPage from "./pages/ProductPage";
import CustomerPage from "./pages/CustomerPage";
import OrderPage from "./pages/OrderPage";
import DebtPage from "./pages/DebtPage";
import AIAssistantPage from "./pages/AIAssistantPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
            path="/register"
            element={<RegisterPage />}
          />
        </Route>

        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route
            path="/dashboard"
            element={ <AdminRoute><DashboardPage/></AdminRoute>}
          />

          <Route
            path="/products"
            element={<ProductPage />}
          />

          <Route
            path="/customers"
            element={<CustomerPage />}
          />

          <Route
            path="/orders"
            element={<OrderPage />}
          />

          <Route
            path="/debts"
            element={<DebtPage />}
          />

          <Route
            path="/ai"
            element={<AIAssistantPage />}
          />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;