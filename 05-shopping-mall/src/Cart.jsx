import { useCart } from "./Context";

export default function Cart() {
  const cart = useCart();
  const total = cart.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  return (
    <div className="grid px-8 xl:px-30 grid-rows-[1fr_auto_auto]">
      <ul className="flex flex-col">
        {cart.map((product) => (
          <li
            key={product.id}
            className="flex items-center justify-between border-b-1 border-b-gray-200 py-8"
          >
            <div className="flex items-center gap-4">
              <div className="h-30 w-30 overflow-hidden shrink-0">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-contain size-full"
                />
              </div>
              <div className="w-50">{product.title}</div>
            </div>
            <div className="flex flex-col gap-3">
              <select className="border-gray-200 border-1 px-2 py-1 rounded-md">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              <button className="cursor-pointer text-purple-500">Remove</button>
            </div>
            <div className="w-15 text-right">${product.price}</div>
          </li>
        ))}
      </ul>
      <div className="my-8 flex justify-between">
        <div className="font-bold">Order total</div>
        <div className="font-bold">${total}</div>
      </div>
      <button className="bg-purple-500 text-white font-bold rounded-md py-3 cursor-pointer mb-8">
        Checkout
      </button>
    </div>
  );
}
