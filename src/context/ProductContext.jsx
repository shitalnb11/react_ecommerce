import { createContext, useContext, useEffect, useState } from "react";

import img1 from "../assets/img/1img.jpeg";
import img2 from "../assets/img/2img.jpeg";
import img3 from "../assets/img/3img.jpeg";
import img4 from "../assets/img/4img.jpeg";
import img5 from "../assets/img/5img.jpeg";
import img6 from "../assets/img/6img.jpeg";
import img7 from "../assets/img/7img.jpeg";
import img8 from "../assets/img/8img.jpeg";
import img9 from "../assets/img/9img.jpeg";
import img10 from "../assets/img/10img.jpeg";
import img11 from "../assets/img/11img.jpeg";
import img12 from "../assets/img/12img.jpeg";
import img13 from "../assets/img/13img.jpeg";
import img14 from "../assets/img/14img.jpeg";

const ProductContext = createContext();

const DEFAULT_PRODUCTS = [
  { id: 1, title: "Blue Denim Jacket", price: 2999, image: img1, details: "Premium denim jacket" },
  { id: 2, title: "White Sneakers", price: 2499, image: img2, details: "Comfortable sneakers" },
  { id: 3, title: "Classic Watch", price: 1999, image: img3, details: "Stylish watch" },
  { id: 4, title: "Leather Handbag", price: 2499, image: img4, details: "Genuine leather bag" },
  { id: 5, title: "Men Casual Shirt", price: 1599, image: img5, details: "Cotton casual shirt" },
  { id: 6, title: "Women Ethnic Dress", price: 2799, image: img6, details: "Beautiful ethnic wear" },
  { id: 7, title: "Running Shoes", price: 2199, image: img7, details: "Lightweight shoes" },
  { id: 8, title: "Sunglasses", price: 1299, image: img8, details: "UV-protected glasses" },
  { id: 9, title: "Bluetooth Headphones", price: 3499, image: img9, details: "Noise cancelling" },
  { id: 10, title: "Laptop Backpack", price: 1899, image: img10, details: "Waterproof backpack" },
  { id: 11, title: "Men Wallet", price: 899, image: img11, details: "Slim leather wallet" },
  { id: 12, title: "Women Heels", price: 2399, image: img12, details: "Stylish heels" },
  { id: 13, title: "Smart LED Lamp", price: 1499, image: img13, details: "Smart night lamp" },
  { id: 14, title: "Gym Bag", price: 1999, image: img14, details: "Spacious gym bag" },
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Load products (default + admin)
  useEffect(() => {
    const adminProducts =
      JSON.parse(localStorage.getItem("adminProducts")) || [];

    setProducts([...DEFAULT_PRODUCTS, ...adminProducts]);
  }, []);

  // ➕ Add Product
  const addProduct = (product) => {
    const newProduct = { ...product, id: Date.now() };

    const adminProducts =
      JSON.parse(localStorage.getItem("adminProducts")) || [];

    const updatedAdmin = [...adminProducts, newProduct];
    localStorage.setItem("adminProducts", JSON.stringify(updatedAdmin));

    setProducts((prev) => [...prev, newProduct]);
  };

  // ✏️ Update Product (FIXED)
  const updateProduct = (id, updatedData) => {
    const numericId = Number(id);

    const updatedProducts = products.map((p) =>
      p.id === numericId ? { ...p, ...updatedData } : p
    );
    setProducts(updatedProducts);

    const adminProducts =
      JSON.parse(localStorage.getItem("adminProducts")) || [];

    const updatedAdmin = adminProducts.map((p) =>
      p.id === numericId ? { ...p, ...updatedData } : p
    );

    localStorage.setItem("adminProducts", JSON.stringify(updatedAdmin));
  };

  // ❌ Delete Product
  const deleteProduct = (id) => {
    const numericId = Number(id);

    setProducts((prev) => prev.filter((p) => p.id !== numericId));

    const adminProducts =
      JSON.parse(localStorage.getItem("adminProducts")) || [];

    const updatedAdmin = adminProducts.filter(
      (p) => p.id !== numericId
    );

    localStorage.setItem("adminProducts", JSON.stringify(updatedAdmin));
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
