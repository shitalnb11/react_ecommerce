import FeaturedProducts from "../components/FeaturedProducts";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Shop the Latest Trends</h1>
          <p>Exclusive deals on top brands — only at Mumbaishopper!</p>
          <a href="/products" className="btn11">Shop Now</a>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <FeaturedProducts />
    </>
  );
}
