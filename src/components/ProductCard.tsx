
import { Link } from 'react-router-dom'
import type { Product } from '../types/product'


function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="block w-[400px] h-[400px] hover:scale-[1.02] transition-transform"
    >
      <div className="w-full h-full flex flex-col p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md bg-white">


        <div className="flex-1 flex items-center justify-center overflow-hidden rounded-md">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain w-full h-full"
          />
        </div>


        <p className="font-semibold text-sm mt-3 line-clamp-2">
          {product.title}
        </p>


        <p className="font-bold text-lg text-green-700">₹{product.price}</p>
      </div>
    </Link>

  )
}

export default ProductCard