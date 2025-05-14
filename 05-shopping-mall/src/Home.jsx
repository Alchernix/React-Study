import { Link } from "react-router-dom";

// 메인 페이지
export default function Home() {
  const sampleImgs = [
    {
      category: "men's clothing",
      link: "/men%27s%20clothing",
      imageSrc:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    },
    {
      category: "women's clothing",
      link: "/women%27s%20clothing",
      imageSrc: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    },
    {
      category: "jewelery",
      link: "/jewelery",
      imageSrc:
        "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    },
    {
      category: "electronics",
      link: "/electronics",
      imageSrc: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    },
  ];

  return (
    <div>
      <div className="relative h-150 bg-[url(https://sakebako.com/html/upload/save_image/0226185921_63fb2d796bb84.jpeg)] bg-cover bg-center">
        <div className="absolute h-full inset-0 bg-black opacity-50 z-0"></div>
        <div className="relative h-full inset-0 z-10 text-white px-8 xl:px-100 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold mb-4">Lorem Ipsum</div>
          <div className="text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            dapibus, tortor et maximus venenatis, lorem risus imperdiet purus,
            eu faucibus enim sapien sed arcu. Aliquam pretium tellus eu
            dignissim porta.
          </div>
        </div>
      </div>
      <div className="px-8 xl:px-30">
        <div className="text-2xl font-bold mt-8">Shop by Category</div>
        <div className="grid grid-cols-4 gap-8 h-40 my-8">
          {sampleImgs.map((c) => (
            <Link key={c.category} to={c.link} className="block relative p-4">
              <div
                style={{ backgroundImage: `url(${c.imageSrc})` }}
                className="bg-contain bg-no-repeat bg-center h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20 z-0"></div>
                <div className="absolute inset-x-0 bottom-5 text-center font-bold text-white z-10 xl:text-xl">
                  {c.category}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
