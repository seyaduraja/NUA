import { useState, useMemo } from 'react'
import { useGetProductsQuery, useGetCategoriesQuery, useGetProductsByCategoryQuery } from '../api/fakestoreApi'
import ProductCard from '../components/ProductCard'
import  NavBar  from "../components/NavBar";


export default function ProductListing() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const { data: categoriesData, isLoading: loadingCategories } = useGetCategoriesQuery()
  const productsQuery = category === 'all' ? useGetProductsQuery() : useGetProductsByCategoryQuery(category)
  const { data: products } = productsQuery

  const filtered = useMemo(() => {
    if (!products) return []
    return products.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
  }, [products, search])

  return (
    <>
      <div className="w-full px-5 pt-5">
        <NavBar />
      </div>
      <div className='w-full flex flex-col px-10 py-10 gap-10 '>
        <div className='w-full flex justify-between items-center '>
          <input placeholder="Search by title" value={search} onChange={(e) => setSearch(e.target.value)} />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All categories</option>
            {loadingCategories ? null : categoriesData?.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center'>
          {filtered?.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </>
  )
}
