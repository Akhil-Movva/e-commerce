import "./styles.css";
import { useState } from "react";
import { ProductList } from "./ProductList";
import { Cart } from "./Cart";
import { WishList } from "./WishList";

export default function App() {
  const [route, setRoute] = useState("products");

  return (
    <div className="App">
      <header>
        <div className="heading">BuyAtOnce</div>
      </header>
      <div className="route-container">
        <button
          onClick={() => setRoute("products")}
          className="button button-specific"
        >
          Products
        </button>
        <button
          onClick={() => setRoute("cart")}
          className="button button-specific"
        >
          Cart
        </button>
        <button
          onClick={() => setRoute("wishlist")}
          className="button button-specific"
        >
          Wish List
        </button>
      </div>

      {route === "products" && <ProductList />}
      {route === "cart" && <Cart />}
      {route === "wishlist" && <WishList />}
    </div>
  );
}
