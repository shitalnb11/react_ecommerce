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
  { id: 1, title: "Blue Denim Jacket", price: 2999, image: img1, details: "Premium denim jacket LZLER Men's Denim Jackets Distressed Destroyed Classic Vintage Slim Fit Ripped Fashion Trendy Trucker Jean Jackets " },
  { id: 2, title: "White Sneakers", price: 2499, image: img2, details: "Comfortable sneakers are characterized by plush cushioning, flexible yet supportive construction, breathable materials (like mesh/soft leather), padded interiors (especially around heel/tongue), lightweight feel, and a secure, non-restrictive fit, offering a soft, bouncy, or stable ride for all-day wear without pressure points." },
  { id: 3, title: "Classic Watch", price: 1999, image: img3, details: "Stylish watch A stylish watch is an accessory that combines form and function, often featuring a clean design, quality materials, and a proportional fit to enhance the wearer's personal aesthetic and leave a lasting impression." },
  { id: 4, title: "Leather Handbag", price: 2499, image: img4, details: "Genuine leather bag A good description for a genuine leather bag should highlight its durability, rich sensory details (smell, feel), and the unique way it ages with a patina. Focus on how these features benefit the user and add to its timeless appeal rather than just listing features" },
  { id: 5, title: "Men Casual Shirt", price: 1599, image: img5, details: "Cotton casual shirt A great product description for a cotton casual shirt combines a compelling narrative about the product's benefits with essential technical details, highlighting its comfort and versatility." },
  { id: 6, title: "Women Ethnic Dress", price: 2799, image: img6, details: "Beautiful ethnic wear Beautiful ethnic wear evokes timeless elegance, rich heritage, and cultural pride, featuring intricate craftsmanship, vibrant colors, and luxurious fabrics like silk or rich cottons, seen in flowing sarees, regal lehengas, or graceful salwar kameez, often adorned with embroidery, mirror work, or delicate prints that tell a story of tradition and bring a regal, confident aura to the wearer, making" },
  { id: 7, title: "Running Shoes", price: 2199, image: img7, details: "Lightweight shoes are designed to provide comfort, speed, and reduced fatigue by using advanced, low-density materials in their construction. They prioritize shaving off grams without compromising on necessary support or performance, making them feel almost weightless on the feet." },
  { id: 8, title: "Sunglasses", price: 1299, image: img8, details: "UV-protected glasses feature lenses with a special coating or built-in material that blocks harmful UVA and UVB rays, preventing damage to your eyes and the delicate skin around them, with labels like UV400 indicating they block 99.9% of UV light up to 400 nanometers, protecting against cataracts, macular degeneration, and skin cancer. These glasses absorb, reflect, or filter UV radiation, offering essential protection even on cloudy days and reducing glare for better comfort and vision. " },
  { id: 9, title: "Bluetooth Headphones", price: 3499, image: img9, details: "Noise cancelling reduces unwanted sounds by using either physical barriers (Passive Noise Cancellation/Isolation) or microphones to create inverse sound waves that cancel out ambient noise (Active Noise Cancellation/ANC) for a quieter listening experience, working best with steady, low-frequency sounds like engine hums but less effectively with sudden, high-pitched noises, notes" },
  { id: 10, title: "Laptop Backpack", price: 1899, image: img10, details: "Waterproof backpacks are often made of special materials such as PVC or TPU, which are water-repellent and prevent water from entering the backpack. Some waterproof backpacks also have special zips or seals to ensure water does not enter." },
  { id: 11, title: "Men Wallet", price: 899, image: img11, details: "A slim leather wallet is a minimalist, compact accessory designed to hold only essential items without creating a bulge in your pocket, blending style with practicality. It provides a streamlined way to carry cards and cash, encouraging organization and reducing clutter." },
  { id: 12, title: "Women Heels", price: 2399, image: img12, details: "Stylish heels are versatile footwear that elongate legs and elevate outfits, ranging from dramatic stilettos (thin, high, pointy for glam) and stable block heels (broad base for comfort/confidence) to elegant pumps (versatile, sometimes peep-toe) and classic kitten heels (low, refined for all-day wear), with modern options adding bold colors or unique textures like quilted leather, offering a blend" },
  { id: 13, title: "Smart LED Lamp", price: 1499, image: img13, details: "The night light lights up in the darkness automatically by the light control sensor. When plugin, the night light will light up with the surrounding lighting, when in darkness it will turn on automatically for lighting mode. Highlights: Lamp works only when lights are off & it is dark." },
  { id: 14, title: "Gym Bag", price: 1999, image: img14, details: "A spacious gym bag is characterized by its large capacity, dedicated compartments for organization and hygiene, and durable, often water-resistant, materials designed to handle the demands of an active lifestyle. " },
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // 🔥 Load products (static + admin)
  useEffect(() => {
    const adminProducts =
      JSON.parse(localStorage.getItem("adminProducts")) || [];

    setProducts([...DEFAULT_PRODUCTS, ...adminProducts]);
  }, []);

  // ➕ Add Product (Admin Panel)
  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
    };

    const adminProducts =
      JSON.parse(localStorage.getItem("adminProducts")) || [];

    const updatedAdmin = [...adminProducts, newProduct];
    localStorage.setItem("adminProducts", JSON.stringify(updatedAdmin));

    setProducts((prev) => [...prev, newProduct]);
  };

  // ❌ Delete Product
  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);

    const adminProducts =
      JSON.parse(localStorage.getItem("adminProducts")) || [];

    const updatedAdmin = adminProducts.filter((p) => p.id !== id);
    localStorage.setItem("adminProducts", JSON.stringify(updatedAdmin));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
