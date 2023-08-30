"use client";
import Image from "next/image";

export const Card = ({ blog, categories }) => {
  return (
    <div className="w-80 h-96 rounded-md flex flex-col shadow-lg overflow-hidden justify-between pb-2 hover:-translate-y-4 duration-100 cursor-pointer">
      <div>
        <div className="w-full h-36 relative">
          <Image fill objectFit="cover" src={blog.imageUrl} alt={blog.title} />
        </div>
        <div className="px-2 pt-2 text-left">
          <div className="text-[#5E59E7] text-xs flex gap-2">
            {blog.categories?.map((category, index) => (
              <p className="font-medium" key={index}>
                {categories.find((el) => el.id == category).name}
              </p>
            ))}
          </div>
          <h1 className="mt-2 text-md font-semibold">{blog.title}</h1>
          <p className="text-xs text-gray-400 mt-6">{blog.excerpt}</p>
        </div>
      </div>
      <div className="h-10 w-full flex gap-2 pl-3">
        <div className="h-full aspect-square rounded-full relative overflow-hidden">
          <Image src={blog.imageUrl} alt={blog.slug} fill objectFit="cover" />
        </div>
        <div className="h-full text-left justify-around flex flex-col">
          <h1 className="text-xs font-semibold">Aritra Roy</h1>
          <p className="text-[0.6rem] text-gray-400 font-semibold">
            {new Intl.DateTimeFormat("en-GB", {
              dateStyle: "full",
            }).format(new Date()) + "  "}
            • {"  " + blog.categories[0]} min read
          </p>
        </div>
      </div>
    </div>
  );
};
