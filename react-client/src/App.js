import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import ProductListPage from "./pages/ProductListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

//User Pages
import UserProfilePage from "./pages/user/UserProfilePage";
import UserOrdersPage from "./pages/user/UserOrdersPage";
import UserOrderDetailsPage from "./pages/user/UserOrderDetailsPage";
import UserCardDetailsPage from "./pages/user/UserCardDetailsPage";

//Admin Pages
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import AdminChatsPage from "./pages/admin/AdminChatsPage";
import AdminCreateProductPage from "./pages/admin/AdminCreateProductPage";
import AdminEditProductPage from "./pages/admin/AdminEditProductPage";
import AdminEditUserPage from "./pages/admin/AdminEditUserPage";
import AdminOrderDetailsPage from "./pages/admin/AdminOrderDetailsPage";
import AdminOrdersPage from "./pages/admin/AdminOrdersPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";

//Compoenets
import ProtactedRoutesComponent from "./components/ProtactedRoutesComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

//User Compoenets
//import UserChatComponent from "./components/user/UserChatComponent";
import RouteWithUserChatComponent from "./components/user/RouteWithUserChatComponent";

//Scroll
import ScrollToTop from "./utils/ScrollToTop";
function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <HeaderComponent />

        <Routes>
          <Route element={<RouteWithUserChatComponent />}>
            {/* Publicly Avaialble Pages*/}
            <Route path="/" element={<HomePage />} />
            <Route path="/product-list" element={<ProductListPage />} />
            <Route path="/product-details" element={<ProductDetailsPage />} />
            <Route
              path="/product-details/:id"
              element={<ProductDetailsPage />}
            />
            <Route path="/cart-page" element={<CartPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element="404 Page Does'nt Exists" />
          </Route>

          {/* <Route path="/" component={HomePage} />  in previous versions of react-router-dom */}

          {/* User Protected Pages*/}
          <Route element={<ProtactedRoutesComponent admin={false} />}>
            <Route path="/user" element={<UserProfilePage />} />
            <Route path="/user/my-orders" element={<UserOrdersPage />} />
            <Route
              path="/user/cart-details"
              element={<UserCardDetailsPage />}
            />
            <Route
              path="/user/order-details"
              element={<UserOrderDetailsPage />}
            />
          </Route>
          {/* Admin Protected Pages*/}
          <Route element={<ProtactedRoutesComponent admin={true} />}>
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/edit-user" element={<AdminEditUserPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route
              path="/admin/create-new-product"
              element={<AdminCreateProductPage />}
            />
            <Route
              path="/admin/edit-product"
              element={<AdminEditProductPage />}
            />
            <Route path="/admin/orders" element={<AdminOrdersPage />} />
            <Route
              path="/admin/order-details/:id"
              element={<AdminOrderDetailsPage />}
            />
            <Route path="/admin/chats" element={<AdminChatsPage />} />
            <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
          </Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;