import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import ProductFilters from "../components/ProductFilters";


const Products = () => {
  const { products } = useProducts();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(products); // initial load
  }, [products]);

  const handleAddToCart = (product) => {
    if (!user) {
      alert("Please login to add product to cart");
      navigate("/login");
      return;
    }
    addToCart(product);
    alert("Product added to cart");
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Our Products</h2>

      <div className="products-wrapper d-flex">
        {/* FILTERS */}
        <div className="sidebar">
          <ProductFilters
            products={products}
            onFilter={setFilteredProducts}
          />
        </div>

        {/* PRODUCTS LIST */}
        <div className="products-list">
          <div className="row">
            {filteredProducts.length === 0 ? (
              <p>No products found</p>
            ) : (
              filteredProducts.map((item) => (
                <div className="col-md-4 mb-4" key={item.id}>
                  <div className="card shadow-sm h-100">
                    <img
                      src={item.image || "https://via.placeholder.com/300"}
                      className="card-img-top"
                      alt={item.title}
                      style={{ height: "220px", objectFit: "cover" }}
                    />

                    <div className="card-body d-flex flex-column">
                      <h5>{item.title}</h5>
                      <p className="text-success fw-bold">₹{item.price}</p>

                      <Link
                        to={`/productDetails/${item.id}`}
                        className="btn btn-outline-primary mb-2 w-100"
                      >
                        View Details
                      </Link>

                      <button
                        className="btn btn-primary mt-auto w-100"
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
