import { useProduct } from "./ProductContext";

export function WishList() {
  const {
    state: { wishList },
    dispatch
  } = useProduct();

  return (
    <div>
      <h1>Wish List</h1>
      <div className="container-card">
        {wishList.map((item) => (
          <div key={item.id} className="card">
            <img className="img-responsive" src={item.image} alt={item.name} />
            <div>{item.name}</div>
            <div>${item.price}</div>
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
                  dispatch({ type: "REMOVE_FROM_WISHLIST", payload: item });
                }}
                className="card__button card__button--product"
              >
                Remove from wish list
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
