import React from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

const Product = ({ state }) => {
  let { productId } = useParams();
  const { products = [] } = state;
  console.log(products.filter((obj) => obj.id === 1));

  const { title, price, id, image } = products.filter(
    (product) => product.id === parseInt(productId)
  )[0];
  console.log(productId);

  return (
    <div
      style={{
        width: "33%",
        backgroundColor: "blue",
        height: "250px",
      }}
    >
      <img
        src={image || ""}
        alt={title || ""}
        style={{ height: "100px", width: "150px", margin: "16px" }}
      />
      <br />
      <h4>{title || "Some Product"}</h4>
      {productId && (
        <>
          <h3>{productId}</h3>
          <h5>Price:&nbsp;{price || 0}</h5>
          <h5>Quantity:</h5>
          <select name="quantit" id="quantity" defaultValue={"1"}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <br />
          <button onClick={() => alert("Coming Soon")}>Add To Cart</button>
        </>
      )}
    </div>
  );
};

Product.propTypes = {
  title: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.number,
  image: PropTypes.string,
};

export default Product;
