import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";
import { WishlistProvider } from "./context/WishlistContext";
import { ReviewProvider } from "./hooks/useReview.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              <WishlistProvider>
                <ReviewProvider> {/* Wrap App with ReviewProvider */}
                  <App />
                </ReviewProvider>
              </WishlistProvider>
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
