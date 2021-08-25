import React from "react";
import { render, useState, Fragment } from "@wordpress/element";
import { ProductEditView } from "./components/product-edit";
import { ProductGrid } from "./components/product-display";
import { Cart } from "./components/cart";
import BoxForm from "./components/json-box";
import { __, sprintf } from "@wordpress/i18n";
import classnames from "classnames";

const getRenderedView = (
  view,
  cartItems,
  addToCart,
  removeFromCart,
  onBoxFormSubmit
) => {
  switch (view) {
    case "box-form":
      return <BoxForm onSubmit={onBoxFormSubmit} />;
    case "cart":
      return (
        <Fragment>
          <h1>Cart</h1>
          <Cart cartItems={cartItems} onRemove={removeFromCart} />
        </Fragment>
      );
    case "display":
      return (
        <Fragment>
          <h1>Product Directory</h1>
          <ProductGrid cartItems={cartItems} addToCart={addToCart} />
        </Fragment>
      );
    case "edit":
      return (
        <Fragment>
          <h1>Product Editor</h1>
          <ProductEditView />
        </Fragment>
      );
    default:
      return null;
  }
};

function App() {
  const [view, setView] = useState("box-form");
  const [cartItems, updateCartItems] = useState([]);
  const buttonClasses = ["btn", "btn-secondary", "btn-sm"];
  const addToCart = product => {
    if (!cartItems.some(cartItem => cartItem.id === product.id)) {
      const updatedCart = [...cartItems, product];
      updateCartItems(updatedCart);
    }
  };
  const removeFromCart = cartItemId => {
    const updatedCartItems = cartItems.filter(
      cartItem => cartItem.id !== cartItemId
    );
    updateCartItems(updatedCartItems);
  };
  const onBoxFormSubmit = () => {
    setView("edit");
  };
  const ViewButtons = () => {
    return view === "box-form" ? null : (
      <div className="fixed-bottom mb-5 mr-5">
        <div
          className="btn-group float-right"
          role="group"
          aria-label={__("Context Switcher")}
        >
          <button
            type="button"
            className={classnames(...buttonClasses, {
              active: view === "edit"
            })}
            onClick={() => setView("edit")}
          >
            {__("Edit")}
          </button>
          <button
            type="button"
            className={classnames(...buttonClasses, {
              active: view === "display"
            })}
            onClick={() => setView("display")}
          >
            {__("Directory")}
          </button>
          <button
            type="button"
            className={classnames(...buttonClasses, {
              active: view === "cart"
            })}
            onClick={() => setView("cart")}
          >
            {sprintf(__("Cart (%s)"), cartItems.length)}
          </button>
        </div>
      </div>
    );
  };
  return (
    <div className="mt-5">
      <div className="container">
        {getRenderedView(
          view,
          cartItems,
          addToCart,
          removeFromCart,
          onBoxFormSubmit
        )}
      </div>
      <ViewButtons />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
