import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../../styles/player.module.scss";
import ButtonRed from "../../public/Button-Red.svg";

import Image from "next/image";

export default function dashboard() {
  const router = useRouter();

  // if (process.browser) {
  //   window.addEventListener("beforeunload", (ev) => {
  //     ev.preventDefault();
  //     return window.alert("Shure you want to go?");
  //   });
  // }

  const name = router.query.name;

  const handlePress = () => {
    var data = JSON.stringify({ name: name });

    fetch("/api/submit-x", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data,
    });
  };

  useEffect(() => {
    const body = JSON.stringify({ name: name, x: false });
    console.log(body);

    fetch(
      "/api/join",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: body,
      },
      []
    );
  });

  return (
    <div className={styles.container}>
      <h1>Player: {name}</h1>
      <div className={styles.imageContainer}>
        <Image
          onClick={() => {
            handlePress();
          }}
          layout="fill"
          src="/Button-Red.svg"
        />
      </div>
    </div>
  );
}
