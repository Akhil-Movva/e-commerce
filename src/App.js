import "./styles.css";
import ProductList from "./ProductList";
import Cart from "./Cart";
import WishList from "./WishList";
import { Routes, Route } from "react-router-dom";
import { Header } from "./Header";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wish-list" element={<WishList />} />
      </Routes>
    </div>
  );
}
