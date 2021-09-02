import { useEffect, useState, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Product from "./Components/Product";

/* 

Cart Items

Item --> Id, Quantity

*/

const initialState = {
  cart: [],
  productId: null,
  products: [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: {
        rate: 3.9,
        count: 120,
      },
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men's clothing",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      rating: {
        rate: 4.1,
        count: "259",
      },
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description:
        "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      rating: {
        rate: 4.7,
        count: 500,
      },
    },
  ],
};

function reducer(state, action) {
  switch (action.type) {
    case "addProducts":
      return { ...state, products: action.products };
    case "addToCart":
      return { ...state, cart: [...state.cart, action.item] };
    case "selectProduct":
      return { ...state, productId: action.productId };
    default:
      throw new Error();
  }
}

function Home({ state }) {
  // Url for products --> https://fakestoreapi.com/products

  return (
    <>
      {state.products.length === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading...
        </div>
      )}
      {state.products.length > 0 && (
        <div
          style={{
            width: "100%",
          }}
        >
          {state.products.slice(0, 3).map(({ title, id, image }) => (
            <div
              style={{
                width: "33%",
                backgroundColor: "blue",
                height: "250px",
              }}
            >
              <img
                src={image}
                alt={title}
                style={{ height: "100px", width: "150px", margin: "16px" }}
              />
              <br />
              <Link to={`/product/${id}`} style={{ color: "#fff" }}>
                <h4>{title || "Some Product"}</h4>
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.products)
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: "addProducts", action: { products: data } });
          console.log(data);
        });
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route
            path="/cart"
            render={() => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                Coming Soon
              </div>
            )}
          />
          <Route path="/product/:productId">
            <Product state={state} />
          </Route>
          <Route path="/">
            <Home state={state} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
