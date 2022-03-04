import { useState, createContext, useContext } from "react";
// import PlayerContext from "./PlayerContext";
import React from "react";

const PlayerContext = React.createContext();

export function PlayerProvider({ value, children }) {
  const [players, setPlayers] = useState([
    { name: "Martin", x: false },
    { name: "Arne", x: true },
  ]);

  const values = { players, setPlayers };

  //   const players = [
  //     { name: "Martin", x: false },
  //     { name: "Arne", x: true },
  //   ];

  return (
    <PlayerContext.Provider value={values}>{children}</PlayerContext.Provider>
  );
}

export function usePlayerContext() {
  return useContext(PlayerContext);
}
