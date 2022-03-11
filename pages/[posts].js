import useRouter from "next/router";
import { query } from ".keystone/api";
import { Lists } from ".keystone/types";
import { KeystoneContext } from "@keystone-6/core/types";
import { useEffect, useState } from "react";

export default function Posts(posts) {
  //   useEffect(async () => {
  //     const data = await query.Post.findMany({ query: "id" });
  //     console.log("My data:", data);
  //   }, []);

  const [data, setData] = useState();

  async function getData() {
    const res = await fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          posts {
            id title
          }
        }`,
      }),
    });
    const posts = await res.json();
    console.log(await posts);
  }

  async function addPlayer() {
    const res = await fetch("/api/graphql", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation {
            createPost(data: {
              title: "Super Newest, coolest title",
              content: "Super Newest, coolest content",
              slug: "superslug"
            }) {
              id title
            }
          }`,
      }),
    });
    const posts = await res.json();
    console.log(await posts);
    // setData(res);
  }

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
        <button onClick={getData}>Mybutton</button>
        <button onClick={addPlayer}>Add</button>
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
