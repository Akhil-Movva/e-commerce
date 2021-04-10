import { createContext, useContext, useReducer } from "react";

const ProductContext = createContext();

function reduceFunc(state, action) {
  switch (action.type) {
    case "LOAD_PRODUCTS":
      return {
        ...state,
        productList: action.payload,
        displayData: action.payload
      };

    case "ADD_TO_CART": {
      for (const item of state.cart) {
        if (item.id === action.payload.id) {
          const arr = state.cart.map((product) => {
            if (product.id === action.payload.id)
              return { ...product, quantity: product.quantity + 1 };
            else return product;
          });

          return {
            ...state,
            cart: arr,
            total: state.total + Number(action.payload.price),
            itemsInCart: state.itemsInCart + 1
          };
        }
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
        total: state.total + Number(action.payload.price),
        itemsInCart: state.itemsInCart + 1
      };
    }

    case "INCREASE_QUANTITY": {
      const a = state.cart.map((item) => {
        if (item.id === action.payload.id)
          return { ...item, quantity: item.quantity + 1 };
        return item;
      });

      return {
        ...state,
        cart: a,
        itemsInCart: state.itemsInCart + 1,
        total: state.total + Number(action.payload.price)
      };
    }

    case "DECREASE_QUANTITY": {
      if (action.payload.quantity === 1) {
        const arr = state.cart.filter((item) => item.id !== action.payload.id);
        return {
          ...state,
          cart: arr,
          itemsInCart: state.itemsInCart - action.payload.quantity,
          total:
            state.total - Number(action.payload.price * action.payload.quantity)
        };
      }

      const arr = state.cart.map((item) => {
        if (item.id === action.payload.id)
          return { ...item, quantity: item.quantity - 1 };
        return item;
      });

      return {
        ...state,
        cart: arr,
        itemsInCart: state.itemsInCart - 1,
        total: state.total - Number(action.payload.price)
      };
    }

    case "REMOVE_FROM_CART": {
      const arr = state.cart.filter((item) => item.id !== action.payload.id);
      return {
        ...state,
        cart: arr,
        itemsInCart: state.itemsInCart - action.payload.quantity,
        total:
          state.total - Number(action.payload.price * action.payload.quantity)
      };
    }

    case "ADD_TO_WISHLIST": {
      return { ...state, wishList: [...state.wishList, action.payload] };
    }

    case "REMOVE_FROM_WISHLIST": {
      const arr = state.wishList.filter(
        (item) => item.id !== action.payload.id
      );
      return { ...state, wishList: arr };
    }

    case "SEARCH_PRODUCTS": {
      let searchArray = [];
      for (let product of state.displayData) {
        if (
          product.name.toLowerCase().indexOf(action.payload.toLowerCase()) !==
          -1
        )
          searchArray = [...searchArray, product];
      }
      if (searchArray.length === 0)
        return {
          ...state,
          displayData: searchArray,
          searchResultText: "No results found!!!"
        };

      return { ...state, displayData: searchArray };
    }

    case "SORT_PRODUCTS": {
      let arr;
      if (action.payload === "LOW_TO_HIGH") {
        arr = state.displayData.sort((a, b) => a.price - b.price);
        return { ...state, displayData: arr };
      } else {
        arr = state.displayData.sort((a, b) => b.price - a.price);
        return { ...state, displayData: arr };
      }
    }

    case "TOGGLE_INVENTORY": {
      const stockBoolean = !state.noOutOfStock;
      const deliveryBoolean = state.deliveryBoolean;

      if (
        (stockBoolean && deliveryBoolean) ||
        (stockBoolean && !deliveryBoolean)
      ) {
        const arr = state.displayData.filter((item) => item.inStock);
        return { ...state, displayData: arr, noOutOfStock: stockBoolean };
      } else if (!stockBoolean && deliveryBoolean) {
        const arr = state.productList.filter((item) => item.fastDelivery);
        return { ...state, displayData: arr, noOutOfStock: stockBoolean };
      } else
        return {
          ...state,
          displayData: state.productList,
          noOutOfStock: stockBoolean
        };
    }

    case "TOGGLE_DELIVERY": {
      const deliveryBoolean = !state.fastDelivery;
      const stockBoolean = state.noOutOfStock;
      if (
        (deliveryBoolean && stockBoolean) ||
        (deliveryBoolean && !stockBoolean)
      ) {
        const arr = state.displayData.filter((item) => item.fastDelivery);
        return { ...state, displayData: arr, fastDelivery: deliveryBoolean };
      } else if (!deliveryBoolean && stockBoolean) {
        const arr = state.productList.filter((item) => item.inStock);
        return { ...state, displayData: arr, fastDelivery: deliveryBoolean };
      } else
        return {
          ...state,
          displayData: state.productList,
          fastDelivery: deliveryBoolean
        };
    }

    case "STOP_SERVER_CALL":
      return { ...state, callGet: false };

    default:
      return state;
  }
}

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(reduceFunc, {
    productList: [],
    cart: [],
    wishList: [],
    noOutOfStock: false,
    fastDelivery: false,
    searchResultText: "",
    callGet: true,
    displayData: []
  });

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
