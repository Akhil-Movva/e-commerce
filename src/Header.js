import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
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
  );
};
