import { useLoaderData } from "react-router-dom";
import { useCartDispatch } from "./Context";

// 제품 상세 페이지
export default function Product() {
  const product = useLoaderData();
  const dispatch = useCartDispatch();

  return (
    <div className="grid grid-cols-2 gap-4 px-10 xl:px-80 items-center">
      <div className="h-70 overflow-hidden shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="object-contain size-full"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-lg font-bold">{product.title}</div>
        <div className="font-bold">{product.price}$</div>
        <div>{product.description}</div>
        {/* <div className="flex justify-center">
          <div className="grid grid-cols-3 w-40 border-1 border-purple-500 ">
            <button className="py-2 bg-purple-200">-</button>
            <div className="text-center py-2">{cnt}</div>
            <button className="py-2 bg-purple-200">+</button>
          </div>
        </div> */}
        <button
          onClick={() =>
            dispatch({
              type: "add",
              product,
            })
          }
          className="font-bold text-white bg-purple-500 py-3 rounded-md cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
