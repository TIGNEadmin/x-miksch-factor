import Head from "next/head";
import Image from "next/image";
import styles from "../styles/xStyle.module.scss";
import Xsvg from "../public/x-symbol-svgrepo-com.svg";
import { useContext, useEffect, useState } from "react";
import { usePlayerContext } from "../PlayerProvider";
import { playerActions } from "../data/players-crud";
import useSound from "use-sound";

import buzzer from "../public/wrong-answer-sound-effect.mp3";

export default function Home() {
  // var { players, setPlayers } = usePlayerContext();
  // var newPlayers = playerActions.getAll();

  var [players, setPlayers] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  var { deletePlayer, deleteAll } = playerActions;
  const [play] = useSound(buzzer);

  function soundBuzzer(oldPlayers, newPlayers) {
    for (var i = 0; i < oldPlayers.length; i++) {
      if (oldPlayers[i].x != newPlayers[i].x && oldPlayers[i].x == false) {
        play();
        oldPlayers[i].x = newPlayers[i].x;
      }
    }
  }

  function updatePlayers() {
    var newPlayers = playerActions.getAll();
    // console.log("These are the updated players: ", newPlayers);

    soundBuzzer(players, newPlayers);
    setPlayers(newPlayers);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      updatePlayers();
    }, 250);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    var counter = 1;
    var limit = Math.floor(players.length / 2);

    players.map((player) => {
      if (player.x == true) {
        counter += 1;
      }
    });

    if (counter >= limit && players.length > 2) {
      setGameOver(true);
      console.log("GameOVER!");
    }
    console.log("Counter", counter);
    console.log("limit: ", limit);
  }, [setPlayers]);

  // useEffect(() => {
  //   var newPlayers = playerActions.getAll();
  //   console.log("These are the new players: ", newPlayers);
  //   setPlayers(newPlayers);
  // }, setInterval(1000));

  // setPlayers([{ name: "Henrik", x: false }]);

  function createPlayer(player) {
    return (
      <div key={player.name} className={styles.playerContainer}>
        <h4 className={styles.name}>{player.name}</h4>
        {player.x ? (
          <Xsvg className={(styles.svgStyle, styles.active)}></Xsvg>
        ) : (
          // <xSvg style={{ color: "red", width: "200px", height: "200px" }} />
          <Xsvg className={styles.svgStyle}></Xsvg>
        )}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>X-factor</title>
      </Head>

      <main
        className={
          (styles.main, gameOver ? styles.gameOver : styles.gameActive)
        }
      >
        <div className={styles.outerContainer}>
          <div className={styles.info}>
            <h1>X-Miksch-Factor</h1>
            <h2>Kan Guldal holde rytmen?</h2>
          </div>
          {typeof players !== "undefined" ? (
            <div className={styles.playersContainer}>
              {players.map((element) => {
                return createPlayer(element);
              })}
            </div>
          ) : (
            <h4
              style={{
                margin: "2rem auto",
                width: "500px",
                textAlign: "center",
              }}
            >
              No players here yet
            </h4>
          )}

          <div style={{ display: "flex", justifyContent: "Center" }}>
            <button
              className={styles.newRoundButton}
              onClick={() => {
                fetch("/api/new-round");
                setGameOver(false);
              }}
            >
              Neste runde
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
