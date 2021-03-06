import React, { useState, useEffect } from "react";
import ProductService from "../../Services/ProductService";
import ProductItem from "../Products/ProductItem";
import FiltreNav from "./FilterNav";

const FilterByPriceLTH = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    ProductService.getProductsByPriceLTH().then(({ products }) => {
      setProducts(products);
    });
  }, []);

  return (
    <div>
      <FiltreNav />
      <div className="d-flex flex-wrap justify-content-around">
        {products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FilterByPriceLTH;
