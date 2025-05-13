import { useContext } from "react";
import { useParams } from "react-router";

// 제품 목록 페이지
export default function Products() {
  const { category } = useParams();
  let products = useContext(ProductsContext);
  if (category) {
    products = products.filter((product) => product.category === category);
  }
  return (
    <main className="grid w-full grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] xl:grid-cols-5 gap-5 px-8 xl:px-30 py-4">
      {products.map((product) => (
        <Link
          to={"/" + product.category + "/products/" + product.id}
          key={product.id}
        >
          <div className="flex flex-col gap-2">
            <div className="h-50 overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="object-contain size-full"
              />
            </div>
            <div>{product.title}</div>
            <div className="font-bold">{product.price}$</div>
          </div>
        </Link>
      ))}
    </main>
  );
}
