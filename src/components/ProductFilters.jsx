import { useState, useEffect } from "react";

export default function ProductFilters({ products, onFilter }) {
  if (!products || products.length === 0) return null;

  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];
  const ratings = [5, 4, 3, 2, 1];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter(
        p => p.category === selectedCategory
      );
    }

    if (selectedBrand) {
      filtered = filtered.filter(
        p => p.brand === selectedBrand
      );
    }

    if (selectedRating) {
      filtered = filtered.filter(
        p => Number(p.rating) >= Number(selectedRating)
      );
    }

    filtered = filtered.filter(
      p =>
        Number(p.price) >= priceRange[0] &&
        Number(p.price) <= priceRange[1]
    );

    onFilter(filtered);
  }, [selectedCategory, selectedBrand, selectedRating, priceRange, products, onFilter]);

  return (
    <div className="filters p-3 border rounded mb-4">
      <h5 className="fw-bold">Filters</h5>

      {/* CATEGORY */}
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* BRAND */}
      <div className="mb-3">
        <label className="form-label">Brand</label>
        <select
          className="form-select"
          value={selectedBrand}
          onChange={e => setSelectedBrand(e.target.value)}
        >
          <option value="">All</option>
          {brands.map(b => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* RATING */}
      <div className="mb-3">
        <label className="form-label">Rating</label>
        <select
          className="form-select"
          value={selectedRating}
          onChange={e => setSelectedRating(e.target.value)}
        >
          <option value="">All</option>
          {ratings.map(r => (
            <option key={r} value={r}>{r} stars & up</option>
          ))}
        </select>
      </div>

      {/* PRICE */}
      <div className="mb-3">
        <label className="form-label">Price Range</label>
        <div className="d-flex gap-2">
          <input
            type="number"
            className="form-control"
            placeholder="Min"
            value={priceRange[null]}
            onChange={e =>
              setPriceRange([Number(e.target.value), priceRange[1]])
            }
          />
          <input
            type="number"
            className="form-control"
            placeholder="Max"
            value={priceRange[null]}
            onChange={e =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
          />
        </div>
      </div>

      {/* RESET */}
      <button
        className="btn btn-secondary w-100"
        onClick={() => {
          setSelectedCategory("");
          setSelectedBrand("");
          setSelectedRating("");
          setPriceRange([0, 100000]);
        }}
      >
        Reset Filters
      </button>
    </div>
  );
}
