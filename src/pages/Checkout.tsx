import { useSelector } from "react-redux"
import type { RootState } from "../store/store";
import { useState } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import { clearCart } from "../store/CartSlice";
import { useNavigate } from "react-router-dom";
import  NavBar  from "../components/NavBar";



const Checkout = () => {

  const cart = useSelector(((state: RootState) => state.cart.items))
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", address: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  console.log(form);

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.address.trim()) e.address = 'Address required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    dispatch(clearCart())
    window.alert('Order placed successfully!')
    navigate('/')
  }

  return (
    <>
      <div className="w-full px-5 pt-5">
        <NavBar />
      </div>
      <div className="p-10 flex flex-col gap-10 ">
        <h1 className="font-semibold text-4xl ">Checkout</h1>
        <div className="w-full flex flex-col gap-20 justify-center items-center  ">
          <table className="bg-gray-100 w-3/4 overflow-hidden rounded-md shadow-lg ">
            <thead >
              <tr className="bg-purple-300">
                <th className="w-1/4 py-2">Product</th>
                <th className="w-1/4">Quantity</th>
                <th className="w-1/4">Price</th>
              </tr>
            </thead>
            <tbody>

              {
                cart.map((c) => (
                  <tr key={c.id} className="text-center font-semibold">
                    <td className="py-2">{c.title}</td>
                    <td className="py-2">{c.qty}</td>
                    <td className="py-2">₹{(c.price * c.qty).toFixed(2)}</td>
                  </tr>
                ))
              }

              <tr className="text-center font-semibold py-2 text-xl">
                <td></td>
                <td className="py-4" >Total Price: </td>
                <td className="flex justify-center items-center mt-3"><div className="bg-black h-10 w-[100px] rounded-md relative">
                  <button className="text-2xl text-white bg-purple-500 rounded-md h-10 w-[100px] font-semibold absolute bottom-1 right-1 ">
                    ₹{cart.reduce((total, item) => total + item.price * item.qty, 0)}
                  </button>
                </div></td>
              </tr>

            </tbody>
          </table>

          <form onSubmit={(e) => handleSubmit(e)} className="w-3/4 flex flex-col justify-center gap-7 ">
            <div className="flex flex-col">
              <h2 className="font-semibold text-2xl mb-3">Shipping Information</h2>
              <p className="text-xs">*fill the details to place the order</p>
            </div>
            <div className="flex flex-col gap-2 font-semibold">
              <label htmlFor="">Full Name</label>
              <input value={form.name} type="text" onChange={(e) => setForm(
                { ...form, name: e.target.value }
              )} placeholder="Enter your full name" className="w-1/2 p-3 rounded-md bg-gray-100" />
              {errors.name && <div className="text-red-400">{errors.name}</div>}
            </div>

            <div className="flex flex-col gap-2 font-semibold">
              <label htmlFor="">Email</label>
              <input value={form.email} onChange={(e) => setForm(
                { ...form, email: e.target.value }
              )} type="text" placeholder="Enter your Email" className="w-1/2 p-3 rounded-md bg-gray-100" />
              {errors.email && <div className="text-red-400">{errors.email}</div>}
            </div>

            <div className="flex flex-col gap-2 font-semibold">
              <label htmlFor="">Address</label>
              <input value={form.address} type="text" onChange={(e) => setForm(
                { ...form, address: e.target.value }
              )} placeholder="Enter your address" className="w-1/2 p-3  rounded-md bg-gray-100" />
              {errors.address && <div className="text-red-400">{errors.address}</div>}
            </div>

            <div>
              <button
                type="submit"
                className="bg-purple-500 text-white px-10 py-3 rounded-md text-xl font-semibold hover:bg-purple-600 transition-all duration-300 shadow-lg shadow-gray-500">
                Place Order
              </button>
            </div>
          </form>


        </div>


      </div>
    </>
  )
}

export default Checkout