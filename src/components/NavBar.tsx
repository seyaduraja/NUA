import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import { useState } from "react"
import logo from "../assets/logo.png"

const NavBar = () => {
    const [open, setOpen] = useState(false);
    const cart = useSelector((state: RootState) => state.cart.items);

    const totalQty = cart.length;


    return (
    <nav className="w-full bg-purple-200 h-16 shadow-md shadow-gray-300 px-5 flex justify-between items-center rounded-md">
      
   
      <div>
        <img className="h-[50px] w-[50px]" src={logo} alt="logo" />
      </div>


      <div className="hidden md:flex gap-10 font-semibold text-xl">
        <Link to="/">
          <div className="bg-purple-500 text-white px-4 py-1 rounded-md shadow-md hover:shadow-xl">
            Home
          </div>
        </Link>

        <Link to="/cart">
          <div className="relative bg-purple-500 text-white px-4 py-1 rounded-md shadow-md hover:shadow-xl">
            Cart
            <div className="absolute h-5 w-5 rounded-full -top-2 -right-2 bg-white text-purple-700 flex justify-center items-center font-bold text-sm">
              {totalQty}
            </div>
          </div>
        </Link>

        <Link to="/products">
          <div className="bg-purple-500 text-white px-4 py-1 rounded-md shadow-md hover:shadow-xl">
            Products
          </div>
        </Link>
      </div>


      <button
        className="md:hidden flex flex-col gap-[3px]"
        onClick={() => setOpen(!open)}
      >
        <span className="w-7 h-[3px] bg-purple-700"></span>
        <span className="w-7 h-[3px] bg-purple-700"></span>
        <span className="w-7 h-[3px] bg-purple-700"></span>
      </button>

 
      {open && (
        <div className="absolute top-16 right-5 bg-purple-100 shadow-lg rounded-md p-4 flex flex-col gap-4 md:hidden w-40 font-semibold text-lg">
          <Link to="/" onClick={() => setOpen(false)}>
            <div className="bg-purple-500 text-white px-4 py-1 rounded-md shadow-md">
              Home
            </div>
          </Link>

          <Link to="/cart" onClick={() => setOpen(false)}>
            <div className="relative bg-purple-500 text-white px-4 py-1 rounded-md shadow-md">
              Cart
              <div className="absolute h-5 w-5 rounded-full -top-2 -right-2 bg-white text-purple-700 flex justify-center items-center font-bold text-sm">
                {totalQty}
              </div>
            </div>
          </Link>

          <Link to="/products" onClick={() => setOpen(false)}>
            <div className="bg-purple-500 text-white px-4 py-1 rounded-md shadow-md">
              Products
            </div>
          </Link>
        </div>
      )}
    </nav>
    )
}

export default NavBar