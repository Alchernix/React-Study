import { Link, useLoaderData, useLocation } from "react-router-dom";

// 제품 목록 페이지
export default function Products() {
  const products = useLoaderData();
  let content;
  if (useLocation().pathname === "/search" && products.length === 0) {
    content = (
      <main className="flex items-center justify-center text-center">
        <div>
          <div className="font-bold mb-2">No results found.</div>
          <div>Please try different keywords or check the spelling.</div>
        </div>
      </main>
    );
  } else {
    content = (
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
  return content;
}
