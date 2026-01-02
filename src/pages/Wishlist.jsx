import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
        ❤️ Wishlist is empty
      </h2>
    );
  }

  return (
    <div className="wishlist-page container mt-4">
      <h2 className="mb-4">My Wishlist</h2>

      <div className="row">
        {wishlist.map((item) => (
          <div key={item.id} className="col-md-3 col-sm-6 mb-3">
            <div className="card h-100 shadow-sm p-2">
              <img
                src={item.image || "https://via.placeholder.com/300"}
                alt={item.name || item.title}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name || item.title}</h5>
                <p className="text-success fw-bold">₹{item.price}</p>

                <div className="mt-auto d-flex gap-2">
                  {/* Remove from Wishlist */}
                  <button
                    className="btn btn-danger flex-fill"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </button>

                  {/* View Product Details */}
                  <Link
                    to={`/productDetails/${item.id}`}
                    className="btn btn-primary flex-fill text-center"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
