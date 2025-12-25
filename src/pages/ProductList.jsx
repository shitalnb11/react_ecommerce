import { useProducts } from "../context/ProductContext";

export default function ProductList() {
  const { products } = useProducts();

  return (
    <div className="container mt-4">
      <h2>All Products</h2>

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="row">
          {products.map((p) => (
            <div className="col-md-4 mt-3" key={p.id}>
              <div className="card">
                <img src={p.image} className="card-img-top" />
                <div className="card-body">
                  <h5>{p.title}</h5>
                  <p>₹{p.price}</p>
                  <p>{p.description}</p>

                  <button className="btn btn-primary">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
