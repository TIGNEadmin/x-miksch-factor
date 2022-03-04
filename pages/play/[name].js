import { useRouter } from "next/router";
import { useEffect } from "react";

export default function dashboard() {
  const router = useRouter();

  if (process.browser) {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      return window.alert("Shure you want to go?");
    });
  }

  const name = router.query.name;

  useEffect(() => {
    const body = JSON.stringify({ name: name, x: false });
    console.log(body);

    fetch("/api/join", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: body,
    });
  });

  return <h1>{name}</h1>;
}
