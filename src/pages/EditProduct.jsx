import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useProducts();

  const product = products.find((p) => p.id === Number(id));

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price);
      setDetails(product.details || "");
      setImage(product.image || "");
    }
  }, [product]);

  if (!product) {
    return <p className="text-center mt-4">Loading product...</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !price) {
      alert("Title आणि Price required आहेत");
      return;
    }

    updateProduct(id, {
      title,
      price: Number(price),
      details,
      image, // image URL save होईल
    });

    navigate("/admin/products");
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Edit Product</h3>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-2">
          <label className="form-label">Product Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Price */}
        <div className="mb-2">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Details */}
        <div className="mb-2">
          <label className="form-label">Product Details</label>
          <textarea
            className="form-control"
            rows="3"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        {/* Image URL */}
        <div className="mb-2">
          <label className="form-label">Image URL</label>
          <input
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Image Preview */}
        {image && (
          <div className="mb-3">
            <p className="mb-1">Preview:</p>
            <img
              src={image}
              alt="Preview"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                border: "1px solid #ddd",
                borderRadius: "6px",
              }}
            />
          </div>
        )}

        <button className="btn btn-success">
          Update Product
        </button>
      </form>
    </div>
  );
}
