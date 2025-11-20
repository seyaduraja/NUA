import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../store/store"
import logo from "../assets/logo.png"

const NavBar = () => {
    const cart = useSelector((state: RootState) => state.cart.items);

    const totalQty = cart.reduce((acc, item) => acc + item.qty, 0);


    return (
        <nav className="w-full h-16 bg-purple-200 flex justify-between items-center shadow-md shadow-gray-300 rounded-md px-5">
            <div>
                <img className="h-[50px] w-[50px]" src= {logo} alt="" />
            </div>
            <div className="flex gap-10 font-semibold text-xl">
                <Link to="/">
                    <div className="bg-purple-500 text-white px-4 py-1 rounded-md shadow-md hover:shadow-xl">
                        Home
                    </div>
                </Link>
                <Link to="/cart">
                    <div className="relative bg-purple-500 text-white px-4 py-1 rounded-md shadow-md hover:shadow-xl ">
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
        </nav>
    )
}

export default NavBar