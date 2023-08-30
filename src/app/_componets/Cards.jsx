"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "./Card";
import Loader from "./Loader";
import { useDebounce } from "../_hooks/useDebounce";

const Cards = ({ blogs: blogList }) => {
  //State initialisations
  const [blogs, setBlogs] = useState(blogList);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [filter, setFilter] = useState([]);
  //Refs
  const isFirstRun = useRef(true);

  //Custom hook calls
  const debouncedSearch = useDebounce(searchString);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetch(`http://localhost:3000/api/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchString: debouncedSearch }),
      });
      const res = await data.json();
      setBlogs(res);
      setLoading(false);
    };
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    fetchData();
  }, [debouncedSearch]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/fetch?page=${page}`);
      console.log("First run");
      const data = await res.json();
      setBlogs(data);
      setLoading(false);
    };
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    fetchData();
  }, [page]);
  useEffect(() => {
    // console.log(filter);
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/filter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filters: filter }),
      });
      console.log("First run");
      const data = await res.json();
      setBlogs(data);
      setLoading(false);
    };
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    fetchData();
  }, [filter.length]);
  return (
    <>
      <>
        <MenuBar
          searchString={searchString}
          setSearchString={setSearchString}
          filter={filter}
          setFilter={setFilter}
          categories={blogList.categories}
        />
        <div className="w-full mx-auto md:px-16 justify-center flex gap-4 mt-12 flex-col md:flex-row items-center">
          {!loading ? (
            blogs?.posts?.map((blog, index) => (
              <Card
                key={blog.id || index}
                blog={blog}
                categories={blogs.categories}
              />
            ))
          ) : (
            <Loader />
          )}
        </div>
        <div className="mt-4">
          <button
            className="m-4 px-2 py-[2px] bg-[#d7d6f3] border-[#5E59E7] enabled:hover:scale-[1.1] enabled:hover:duration-100 border-2 rounded-full font-semibold disabled:border-[#b6b6b8] disabled:bg-[#c6c6c7] disabled:text-[#ebebeb]"
            disabled={page == 0}
            onClick={() => setPage((page) => page - 1)}
          >
            {"<"}
          </button>
          <button
            className="m-4 px-2 py-[2px] bg-[#d7d6f3] border-[#5E59E7] enabled:hover:scale-[1.1] enabled:hover:duration-100 border-2 rounded-full font-semibold disabled:border-[#b6b6b8] disabled:bg-[#c6c6c7] disabled:text-[#ebebeb]"
            disabled={page == blogs.totalPages - 1}
            onClick={() => setPage((page) => page + 1)}
          >
            {">"}
          </button>
        </div>
      </>
    </>
  );
};

const MenuBar = ({
  searchString,
  setSearchString,
  filter,
  setFilter,
  categories,
}) => {
  return (
    <div id="searchBar" className="w-full flex justify-around my-6 gap-2">
      <input
        type="text"
        className="bg-white text-s placeholder:text-s h-10 w-96 px-4 rounded-lg border-[#d7d6f3] border-2 focus:outline-[#5E59E7] hover:cursor-pointer"
        placeholder="Search Here"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <div className="flex justify-between gap-2">
        {filter?.map((f) => (
          <div
            className="text-sm p-2 rounded-lg bg-[#d7d6f3] border-2 border-[#5E59E7]"
            key={f}
          >
            {categories.find((el) => el.id == f).name}{" "}
            <span
              onClick={() => {
                const index = filter.findIndex((i) => i == f);
                const tempArray = [...filter];
                const newFilterArray = tempArray.toSpliced(index, 1);
                setFilter(newFilterArray);
              }}
            >
              ✖
            </span>
          </div>
        ))}
      </div>
      <select
        name=""
        id="filter"
        className="rounded text-xs h-10 w-36 outline-none border-[#d7d6f3] border-2"
        defaultValue={""}
        onChange={(e) => {
          console.log(e.target.value);
          if (e.target.value == "") return;
          setFilter((filter) => [...new Set([...filter, e.target.value])]);
          console.log(filter);
        }}
      >
        <option
          value=""
          className="text-xs text-slategray-400"
          //   disabled
        >
          Select category
        </option>
        {categories.map((el) => (
          <option
            className="text-xs text-slategray-400 p-2"
            key={el.id}
            value={el.id}
          >
            {el.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Cards;
