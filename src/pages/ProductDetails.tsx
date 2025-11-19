import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../api/fakestoreApi";
import QuantitySelect from "../components/QuantitySelect";
import { useAppDispatch } from "../hooks/reduxhooks";
import Loading from "../components/Loading";
import ErrorMessage from "../components/Error";
import { addItem } from "../store/CartSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

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

  const cart = useSelector((state: RootState) => state.cart.items);
  const alreadySelected = cart.some((c) => c.id === Number(id));

  const [qty, setQty] = useState(1);
  const dispatch = useAppDispatch();

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

    window.alert("Added to cart");
  };

  return (
    <div className="flex flex-col p-10 gap-10">
      <div className="w-full flex justify-around items-center gap-10">
        <div className="w-[40%]">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="w-[60%] flex flex-col gap-5">
          <h2 className="font-semibold text-2xl">{product.title}</h2>
          <p className="text-xl font-regular">{product.description}</p>

          <div className="bg-black h-[40px] w-[100px] rounded-md relative">
            <button className="text-2xl text-white bg-green-600 rounded-md h-[40px] w-[100px] font-semibold absolute bottom-1 right-1 ">
              ₹{product.price}
            </button>
          </div>

          {/* <div>
            <label>Qty: </label>
            <QuantitySelect value={qty} onChange={setQty} min={1} max={5} />
          </div> */}
          {alreadySelected ? (
            <></>
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
  );
}
