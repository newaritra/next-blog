import Cards from "./_componets/Cards";
import Header from "./_componets/Header";

export default async function Home({ searchParams }) {
  const { blogs } = await getData({ page: 0 });
  console.log("blogs here", blogs);
  return (
    <div className="mt-12 flex w-11/12 mx-auto text-center place-items-center justify-center display-column flex-col">
      <Header />
      <Cards blogs={blogs} />
    </div>
  );

  async function getData({ page = 0 }) {
    const res = await fetch(`http://localhost:3000/api/fetch?page=${page}`, {
      cache: "no-store",
    });
    let blogs = await res.json();
    // console.log(blogs);
    return { blogs };
  }
}
