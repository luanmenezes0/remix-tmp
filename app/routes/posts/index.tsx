import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getPosts } from "~/models/post.server";

type LoaderData = {
  // this is a handy way to say: "posts is whatever type getPosts resolves to"
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader = async () => {
  return json<LoaderData>({ posts: await getPosts() });
};

export default function Posts() {
  const { posts } = useLoaderData<LoaderData>();

  return (
    <main className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">Posts</h1>
      <ul>
        {posts.map((p) => (
          <li key={p.title}>
            <div>{p.title}</div>
            <div>{p.markdown}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
