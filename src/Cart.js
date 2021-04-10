import React from "react";
import { useProduct } from "./ProductContext";

export default function Cart() {
  const {
    state: { cart },
    dispatch
  } = useProduct();

  let cartAmount = 0,
    cartQuantity = 0;

  for (let item of cart) {
    cartAmount += item.quantity * item.price;
    cartQuantity += item.quantity;
  }

  return (
    <div>
      <h1>Cart</h1>
      {cartQuantity > 0 && <div>Items in cart: {cartQuantity}</div>}
      {cartQuantity > 0 && <div>Total: ${cartAmount}</div>}
      <div className="container-card">
        {cart.map((item) => (
          <div key={item.id} className="card">
            <img className="img-responsive" src={item.image} alt={item.name} />
            <div>{item.name}</div>
            <div>${item.price}</div>
            <div className="card__quantity">
              <div>
                <button
                  onClick={() => {
                    dispatch({ type: "INCREASE_QUANTITY", payload: item });
                  }}
                  className="card__button card__button--quantity"
                >
                  Increase
                </button>
              </div>
              <div>
                <div>quantity: {item.quantity}</div>
              </div>
              <div>
                <button
                  onClick={() =>
                    dispatch({ type: "DECREASE_QUANTITY", payload: item })
                  }
                  className="card__button card__button--quantity"
                >
                  Decrease
                </button>
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  dispatch({ type: "REMOVE_FROM_CART", payload: item });
                }}
                className="card__button card__button--product"
              >
                Remove from cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
