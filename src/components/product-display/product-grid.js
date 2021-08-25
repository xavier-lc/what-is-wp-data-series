import React from "react";
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import { PRODUCTS_STORE_KEY } from "../../data";

const ProductItem = ({
  product = { name: "", description: "", price: "0.00" },
  addToCart,
  inCart
}) => {
  const { name, description, price } = product;
  const cartButton = !inCart ? (
    <p>
      <button
        type="button"
        className="btn btn-sm btn-secondary btn-success"
        onClick={addToCart}
      >
        {__("Add to Cart")}
      </button>
    </p>
  ) : null;
  return (
    <div className="col">
      <h2>{name}</h2>
      <p>{description}</p>
      <div className="float-right">
        <p>{price}</p>
      </div>
      {cartButton}
    </div>
  );
};

const ProductGrid = ({ cartItems = [], addToCart = () => null }) => {
  const products = useSelect(select => {
    return select(PRODUCTS_STORE_KEY).getProducts();
  }, []);
  const productItems = products.map(product => {
    return (
      <ProductItem
        key={product.id}
        product={product}
        addToCart={() => addToCart(product)}
        inCart={cartItems.some(cartItem => cartItem.id === product.id)}
      />
    );
  });
  return <div className="row row-cols-3 py-3 px-lg-5">{productItems}</div>;
};

export default ProductGrid;
