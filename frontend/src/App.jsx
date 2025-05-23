import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/product1";
import Navigation from "./pages/navigate";
import "./App.scss";
import Home from "./pages/home";
import Checkout from "./component/checkout/checkout";
import LoginPage from "./pages/Login";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./routes/privateRoute";
import Profile from "./component/profile/profile";
import Logout from "./component/logout/logout";
import AddProduct from "./pages/addProduct";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="product/" element={<Product />} />
            <Route path="checkout/" element={<Checkout />} />
            <Route path="Login" element={<LoginPage />} />
            <Route path="SignIn" element={<SignIn />} />
            <Route
              path="profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="logout"
              element={
                <PrivateRoute>
                  <Logout />
                </PrivateRoute>
              }
            />
            <Route
              path="addProduct"
              element={
                <PrivateRoute>
                  <AddProduct />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
