import "./styles.css";
import ProductList from "./ProductList";
import Cart from "./Cart";
import WishList from "./WishList";
import { Routes, Route, NavLink } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <header>
        <div className="heading">BuyAtOnce</div>
        <nav>
          <ul className="nav-bar__list">
            <li className="nav-bar__list__item">
              <NavLink
                end
                className="nav-bar__list__link"
                activeStyle={{ fontWeight: "bold" }}
                to="/"
              >
                Products
              </NavLink>
            </li>
            <li className="nav-bar__list__item">
              <NavLink
                className="nav-bar__list__link"
                activeStyle={{ fontWeight: "bold" }}
                to="cart"
              >
                Cart
              </NavLink>
            </li>
            <li className="nav-bar__list__item">
              <NavLink
                className="nav-bar__list__link"
                activeStyle={{ fontWeight: "bold" }}
                to="wish-list"
              >
                Wish list
              </NavLink>
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
