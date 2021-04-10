import { useProduct } from "./ProductContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "./Product.js";

export function ProductList() {
  const {
    state: {
      noOutOfStock,
      fastDelivery,
      searchResultText,
      callGet,
      displayData
    },
    dispatch
  } = useProduct();

  const [loader,setLoader]=useState(false);

  const [searchText, setSearchText] = useState("");

  async function fetchDataFromServer() {
    try {
       setLoader(true);
      const {
        data: { products: dataFromServer }
      } = await axios.get("/api/products");
      setLoader(false);
      dispatch({ type: "LOAD_PRODUCTS", payload: dataFromServer });
    } catch (error) {
      console.log("error occured");
    }
  }

  useEffect(() => {
    if (callGet) fetchDataFromServer();
    dispatch({ type: "STOP_SERVER_CALL" });
  }, []);

  function changeHandler(event) {
    setSearchText(event.target.value);
  }

  function clickHandler() {
    dispatch({ type: "SEARCH_PRODUCTS", payload: searchText });
  }

  return (
    <div>
      <h1> Products</h1>
      <input
        className="search-box"
        onChange={changeHandler}
        placeholder="Search for products..."
      />
      <button className="search-button" onClick={clickHandler}>
        Search
      </button>
      <div className="sort-container">
        <div>Sort By</div>
        <div className="sort-container__radio-container">
          <label>
            <input
              name="sort"
              onChange={() =>
                dispatch({ type: "SORT_PRODUCTS", payload: "LOW_TO_HIGH" })
              }
              type="radio"
            />
            Price: Low to High
          </label>
          <label>
            <input
              name="sort"
              onChange={() =>
                dispatch({ type: "SORT_PRODUCTS", payload: "HIGH_TO_LOW" })
              }
              type="radio"
            />
            Price: High to Low
          </label>
        </div>
      </div>
      <div className="sort-container">
        <div>Filters</div>
        <div className="sort-container__radio-container">
          <label>
            <input
              onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
              checked={noOutOfStock}
              type="checkbox"
            />
            Do not include out of stock
          </label>
          <label>
            <input
              onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
              checked={fastDelivery}
              type="checkbox"
            />
            Fast delivery only
          </label>
        </div>
      </div>
      {loader && <div>Loading...</div>}
      <div>{searchResultText}</div>
      <div className="container-card">
        {displayData.map((item) => (
          <Product key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
