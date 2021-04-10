import { useProduct } from "./ProductContext";
import { useState } from "react";

export function Product({ item }) {
  const {
    state: { wishList },
    dispatch
  } = useProduct();

  const [modalDisplay, setModalDisplay] = useState("none");

  const modalStyle = {
    display: modalDisplay
  };

  return (
    <div className="card">
      <img className="img-responsive" src={item.image} alt={item.name} />
      <div style={modalStyle} className="modal">
        <button
          onClick={() => {
            setModalDisplay("none");
          }}
          className="modal__close"
        >
          x
        </button>
        <div className="modal__title">Add to wish list</div>
        <div className="modal__text">Item already added to wish list</div>
      </div>
      <div>{item.name}</div>
      <div>${item.price}</div>
      {item.inStock ? <div>In Stock</div> : <div>Out of Stock</div>}
      {item.fastDelivery ? (
        <div>Fast Delivery</div>
      ) : (
        <div>Atleast 5 working days</div>
      )}
      <div>
        <button
          onClick={() => {
            dispatch({ type: "ADD_TO_CART", payload: item });
          }}
          className="card__button card__button--product"
        >
          Add to cart
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            let flag = true;
            for (let product of wishList) {
              if (item.id === product.id) {
                setModalDisplay("block");
                flag = false;
                break;
              }
            }
            if (flag) dispatch({ type: "ADD_TO_WISHLIST", payload: item });
          }}
          className="card__button card__button--product"
        >
          Add to wish list
        </button>
      </div>
    </div>
  );
}
