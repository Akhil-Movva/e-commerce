import "./styles.css";
import ProductList from "./ProductList";
import Cart from "./Cart";
import WishList from "./WishList";
import { Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <header>
        <div className="heading">BuyAtOnce</div>
        <nav>
          <ul class="nav-bar__list">
            <li className="nav-bar__list__item">
              <Link to="/">Products</Link>
            </li>
            <li className="nav-bar__list__item">
              <Link to="cart">Cart</Link>
            </li>
            <li className="nav-bar__list__item">
              <Link to="wish-list">Wish list</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="cart" element={<Cart />} />
        <Route path="wish-list" element={<WishList />} />
      </Routes>
    </div>
  );
}
