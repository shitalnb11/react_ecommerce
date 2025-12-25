export default function FeaturedProducts() {
  const products = [
    { id: 1, title: "Blue Denim Jacket", price: 2999, image: "/src/assets/img/1img.jpeg" },
    { id: 2, title: "White Sneakers", price: 2499, image: "/src/assets/img/2img.jpeg" },
    { id: 3, title: "Classic Watch", price: 1999, image: "/src/assets/img/3img.jpeg" },
    { id: 4, title: "Leather Handbag", price: 2499, image: "/src/assets/img/4img.jpeg" },
  ];

  return (
    <section className="products-section">
      <h2>Featured Products</h2>

      <div className="product-grid">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={p.image} className="prod-img" />
            <h3>{p.title}</h3>
            <p>₹{p.price}</p>
            <a href={`/productDetails/${p.id}`} className="btn1">View Details</a>
          </div>
        ))}
      </div>
    </section>
  );
}
