import React from "react";

const ProductItem = (props) => {
  return (
    <div className="card m-1" style={{ width: 250 }}>
      <img
        className="card-img-top"
        src={`img/${props.product.image}`}
        alt="Cardimage"
        style={{ width: "100%" }}
      />
      <div className="card-body">
        <h4 className="card-title h6">{props.product.name}</h4>
        <h2 className="card-text text-bold">{props.product.price} Dh </h2>
        <p className="card-text text-muted">{props.product.description} </p>
        <a href="/" className="btn btn-primary">
          Add To Card
        </a>
        <a href="/" className="ml-1 btn btn-info">
          Buy Now
        </a>
      </div>
    </div>
  );
};

export default ProductItem;
