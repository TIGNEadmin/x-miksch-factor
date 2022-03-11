import useRouter from "next/router";
import { query } from ".keystone/api";
import { Lists } from ".keystone/types";
import { KeystoneContext } from "@keystone-6/core/types";
import { useEffect } from "react";

export default function Posts(posts) {
  //   useEffect(async () => {
  //     const data = await query.Post.findMany({ query: "id" });
  //     console.log("My data:", data);
  //   }, []);

  async function getData() {
    const data = await KeystoneContext.query.Post.findMany({
      query: "id title",
    });
    console.log("My data:", data);
  }

  getData();

  function createPost(post) {
    return (
      <div key={post.id}>
        <h1>{post.title}</h1>
        <h1>{post.content}</h1>
      </div>
    );
  }

  if (posts != undefined) {
    return (
      <>
        {posts.posts.map((post) => {
          return createPost(post);
        })}
      </>
    );
  } else {
    return <h1>No posts here</h1>;
  }
}

export async function getServerSideProps() {
  const posts = await query.Post.findMany({ query: "id title slug content" });
  return {
    props: {
      posts,
    },
  };
}
