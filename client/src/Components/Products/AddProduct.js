import React, { useState, useRef, useEffect } from "react";
import ProductService from "../../Services/ProductService";
import Message from "../Message";

const Register = (props) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    category: "",
  });

  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setProduct({
      name: "",
      description: "",
      image: "",
      price: "",
      category: "",
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    ProductService.postProduct(product).then((data) => {
      const { message } = data;
      setMessage(message);
      resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h3>Add Product</h3>
        <div className="form-group">
          <label htmlFor="username" className="sr-only">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={onChange}
            className="form-control"
            placeholder="Enter Name Product"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username" className="sr-only">
            Description:
          </label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={onChange}
            className="form-control"
            placeholder="Enter Description Product"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username" className="sr-only">
            Image:
          </label>
          <input
            type="file"
            name="image"
            value={product.image}
            onChange={onChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username" className="sr-only">
            Price:
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={onChange}
            className="form-control"
            placeholder="Enter Price Product"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username" className="sr-only">
            Price:
          </label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={onChange}
            className="form-control"
            placeholder="Enter Category Product"
          />
        </div>
        <div className="form-group">
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Add Product
          </button>
        </div>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Register;
