import { useSelector } from "react-redux"
import type { RootState } from "../store/store";
import { useAppDispatch } from "../hooks/reduxHooks";
import { updateQty } from "../store/CartSlice";
import { Link } from "react-router-dom";
import React from "react";

const NavBar = React.lazy(() => import('../components/NavBar'))

const Cart = () => {

  const cart = useSelector(((state: RootState) => state.cart.items))
  const dispatch = useAppDispatch();



  const Increment = (id: number, qty: number) => {
    const next = qty + 1;
    dispatch(
      updateQty({
        id: id,
        qty: next,
      })
    );
    return next;
  };


  const Decrement = (id: number, qty: number) => {
    const next = qty - 1;
    dispatch(
      updateQty({
        id: id,
        qty: next < 1 ? 0 : next,
      })
    );
    return next < 1 ? 1 : next;;
  };

  const productPrice = cart.reduce((total, item) => total + item.price * item.qty, 0);


  return (
    <>
      <div className="w-full px-5 pt-5">
        <NavBar />
      </div>
      <div className="flex flex-col p-10 gap-10">
        <h1 className="font-semibold text-4xl ">Cart</h1>
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-[60%] flex flex-col gap-5 ">
            <div className="w-full h-[600px] overflow-y-auto flex flex-col gap-5 shadow-md p-5 rounded-md shadow-gray-300">
              {cart.length === 0 ?
                (<div className="w-full h-full justify-center items-center flex flex-col gap-5">
                  <p className="text-xl font-semibold">Your Cart is empty</p>
                  <Link to="/products">
                    <div className="flex w-full justify-center items-center">
                      <button className="bg-purple-500 text-white px-10 py-3 rounded-md text-xl font-semibold hover:bg-purple-600 transition-all duration-300 shadow-lg shadow-gray-400">Explore Product!</button>
                    </div>
                  </Link>
                </div>) :
                (<>
                  {cart.map((c) => (
                    <div key={c.id} className="w-full flex justify-around items-center border-2 rounded-md border-purple-600 p-4  ">
                      <img className="w-[200px] h-[200px] object-contain" src={c.thumbnail} alt="" />
                      <div className="w-1/2 flex flex-col gap-7 ">
                        <p className="font-semibold text-2xl">{c.title}</p>
                        <div>
                          <button className="flex text-xl gap-6 bg-purple-300 rounded-md py-2 px-2 border-2 border-purple-700 ">
                            <div onClick={() => Decrement(c.id, c.qty)}>-</div>
                            <div>{c.qty}</div>
                            <div onClick={() => Increment(c.id, c.qty)}>+</div>
                          </button>
                        </div>
                        <div className="bg-black h-10 w-[100px] rounded-md relative">
                          <button className="text-2xl text-white bg-purple-500 rounded-md h-10 w-[100px] font-semibold absolute bottom-1 right-1 ">
                            ₹{c.price}
                          </button>
                        </div>
                        <hr />
                        <div className="font-semibold text-lg flex justify-between items-center">
                          Sub Total : <span className="text-purple-700 text-3xl">₹{(c.price * c.qty).toFixed(2)}</span>
                        </div>

                      </div>
                    </div>

                  ))}
                </>)}


            </div>


            <div className="flex justify-between items-center px-20 text-3xl font-semibold ">Total Price : <span className="text-purple-700 ">
              <div className="bg-black h-10 w-[100px] rounded-md relative">
                <button className="text-2xl text-white bg-purple-500 rounded-md h-10 w-[100px] font-semibold absolute bottom-1 right-1 ">
                  ₹{(productPrice - (productPrice * 0.1)).toFixed(1)}
                </button>
              </div></span></div>

            <Link to="/checkout">
              <div className="flex w-full justify-center items-center">
                <button className="bg-purple-500 text-white px-10 py-3 rounded-md text-xl font-semibold hover:bg-purple-600 transition-all duration-300 shadow-lg shadow-gray-400">Proceed to Checkout</button>
              </div>
            </Link>



          </div>

        </div>
      </div>
    </>
  )
}

export default Cart