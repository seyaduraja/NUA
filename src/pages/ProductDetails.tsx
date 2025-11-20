import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../api/fakestoreApi";
import { useAppDispatch } from "../hooks/reduxHooks";
import Loading from "../components/Loading";
import ErrorMessage from "../components/Error";
import { addItem , updateQty } from "../store/CartSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { CartItem } from "../types/cart";
import  NavBar  from "../components/NavBar";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const {
    data: product,
    error,
    isLoading,
  } = useGetProductQuery(numericId, {
    skip: Number.isNaN(numericId),
  });

  const [qty, setQty] = useState<number>(0);
  const [selected, setselected] = useState<CartItem | null>(null);
  const dispatch = useAppDispatch();

  const cart = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const alreadySelected = cart.find((c) => c.id === Number(id));
    setQty(alreadySelected?.qty ?? 1);
    setselected(alreadySelected ?? null);
  }, [cart]);

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage>Failed to load product.</ErrorMessage>;
  if (!product) return <div>Product not found</div>;

  const handleAdd = () => {
    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.image,
        qty,
      })
    );
  };

  const Increment = () => {
    setQty((prev) => {
      const next = prev + 1;
      dispatch(
        updateQty({
          id: product.id,
          qty: next,
        })
      );
      return next;
    });
  };

  const Decrement = () => {
    setQty((prev) => {
      const next =  prev - 1; 
      dispatch(
        updateQty({
          id: product.id,
          qty: next < 1 ? 0 : next,
        })
      );
      return next < 1 ? 1 : next;;
    });
  };

  return (
    <>
    <div className="w-full px-5 pt-5">
    <NavBar />
    </div>
    <div className="flex flex-col px-10 gap-10 w-full min-h-screen justify-center items-center">
      
      <div className="w-full flex justify-around items-center gap-10">
        <div className="w-[40%] flex justify-center items-center">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="w-[60%] flex flex-col gap-5">
          <h2 className="font-semibold text-2xl">{product.title}</h2>
          <p className="text-xl font-regular">{product.description}</p>

          <div className="bg-black h-10 w-[100px] rounded-md relative">
            <button className="text-2xl text-white bg-purple-500 rounded-md h-10 w-[100px] font-semibold absolute bottom-1 right-1 ">
              ₹{product.price}
            </button>
          </div>

          {selected ? (
            <div>
              <button className="flex text-xl gap-6 bg-purple-300 rounded-md py-2 px-2 border-2 border-purple-700 ">
                <div onClick={Decrement}>-</div>
                <div>{selected.qty}</div>
                <div onClick={Increment}>+</div>
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={handleAdd}
                className="rounded-md px-6 py-3 text-base bg-purple-200 text-purple-700 font-semibold border-[1px] border-purple-700"
              >
                Add to Cart +
              </button>
            </div>
          )}

          <div>
            Rating: {product.rating?.rate} ({product.rating?.count} reviews)
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
