import { useProducts } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

export default function AdminProducts() {
  const { products, deleteProduct } = useProducts();
  const navigate = useNavigate();

  return (
    <div>
      <h3 className="mb-4">All Products</h3>

      {products.length === 0 && <p>No products found</p>}

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price</th>
            <th style={{ width: "180px" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p, i) => (
            <tr key={p.id}>
              <td>{i + 1}</td>
              <td>{p.title}</td>
              <td>₹{p.price}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => navigate(`/admin/products/edit/${p.id}`)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteProduct(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
