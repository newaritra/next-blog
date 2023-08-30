import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function POST(req) {
  const query = req.nextUrl.searchParams;
  const body = await req.json();
  const { filters } = body;
  const page = query.get("page");
  const limit = 3;
  const jsonDirectory = path.join(process.cwd(), "db");
  //Read the json data file blog.json
  let fileContents = await fs.readFile(jsonDirectory + "/blog.json", "utf8");
  //parse the json response
  fileContents = JSON.parse(fileContents);
  if (filters.length)
    fileContents = {
      ...fileContents,
      posts: fileContents.posts.filter((el) =>
        el.categories?.some((el) => filters.some((fil) => fil == el))
      ),
    };
  //paginate the data and send the appropriate page
  const data = paginateBlogs(fileContents, page, limit);
  return NextResponse.json(data);
}

const paginateBlogs = (fileContents, page, limit) => {
  let { posts, categories } = fileContents;
  let totalPages = Math.ceil(posts.length / 3);
  posts = posts.slice(page * limit || 0, page * limit + limit);
  return { posts, totalPages, categories };
};
