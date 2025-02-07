"use client";

import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { urlFor } from "@/sanity/lib/image";
import { motion } from "framer-motion";

interface Product {
  name: string;
  image: { asset: { url: string } };
  price: string;
  description: string;
  category: string;
  stockLevel: number;
  discountPercentage?: number;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = `*[_type == "product"]`;
        const fetchedProducts = await client.fetch(query);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-6 text-gray-800"
      >
        Products List
      </motion.h2>

      {/* Search Input */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 border border-gray-300 p-3 rounded-xl shadow-sm mb-5 bg-white"
      >
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 outline-none text-gray-700 bg-transparent"
        />
      </motion.div>

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-6">
          <FaSpinner className="animate-spin text-gray-600 text-3xl mx-auto" />
        </div>
      ) : filteredProducts.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="border rounded-xl shadow-lg p-4 flex flex-col items-center text-center bg-white transition-all hover:shadow-2xl"
            >
              {/* Product Image */}
              <Image
                src={urlFor(product.image).url()}
                alt={product.name}
                width={150}
                height={150}
                className="rounded-lg object-cover"
              />

              {/* Product Name & Category */}
              <h3 className="text-lg font-semibold my-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">
                <span className="font-semibold">Category:</span> {product.category}
              </p>

              {/* Price & Discount - Fixed Alignment */}
              <div className="flex justify-center items-center gap-3 w-full">
                <p className="font-bold text-green-600 text-lg">${product.price}</p>
                {product.discountPercentage && (
                  <p className="text-red-500 text-sm bg-red-100 px-2 py-1 rounded-md">
                    {product.discountPercentage}% Off
                  </p>
                )}
              </div>

              {/* Description (Fixed Height for Consistency) */}
              <p className="text-gray-500 text-sm mt-2 line-clamp-2 ">
                {product.description}
              </p>

              {/* Stock Status */}
              <span
                className={`px-3 py-1 mt-2 rounded-full text-xs font-medium ${
                  product.stockLevel > 0
                    ? "bg-green-200 text-green-600"
                    : "bg-red-200 text-red-600"
                }`}
              >
                {product.stockLevel > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-gray-600">No products found.</p>
      )}
    </div>
  );
}
