import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/home.module.scss";

export default function Home() {
  const [playerName, setPlayerName] = useState("");

  const handleChange = (e) => {
    setPlayerName(e.target.value);
  };

  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>Velkommen til "Kan Miksch holde takten"</h1>
      <input
        placeholder="Navn"
        onChange={handleChange}
        type="text"
        name="player-name"
      />
      <button
        onClick={() => {
          router.push(`/play/${playerName}`);
        }}
      >
        Start
      </button>
    </div>
  );
}
