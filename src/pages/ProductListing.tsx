import { useState, useMemo } from "react";
import React from "react";
import {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} from "../api/fakestoreApi";

const ProductCard = React.lazy(() => import("../components/ProductCard"));
const NavBar = React.lazy(() => import('../components/NavBar'))

export default function ProductListing() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const { data: categoriesData, isLoading: loadingCategories } =
    useGetCategoriesQuery();
  const productsQuery =
    category === "all"
      ? useGetProductsQuery()
      : useGetProductsByCategoryQuery(category);
  const { data: products } = productsQuery;

  const filtered = useMemo(() => {
    if (!products) return [];
    return products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  return (
    <>
      <div className="w-full px-5 pt-5">
        <NavBar />
      </div>
      <div className="w-full flex flex-col px-10 py-10 gap-10 ">
        <div className="w-full flex justify-between items-center ">
          <div className="w-full flex items-center gap-3 bg-purple-600/10 p-4 rounded-xl backdrop-blur-sm border border-purple-300/30">
            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-white/20 placeholder-purple-300 text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-purple-300"
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/20 text-purple-900 border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Categories</option>
              {!loadingCategories &&
                categoriesData?.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
          {filtered?.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </>
  );
}
