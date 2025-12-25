import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // 🔹 Load products from localStorage
  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Our Products</h2>

      <div className="row">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card shadow-sm h-100">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: "220px", objectFit: "cover" }}
                />

                <div className="card-body d-flex flex-column">
                  <h5>{item.title}</h5>
                  <p className="text-success fw-bold">₹{item.price}</p>

                  <Link
                    to={`/product/${item.id}`}
                    className="btn btn-primary mt-auto w-100"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
