// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { playerActions } from "../../tmp/players-crud";

export default function handler(req, res) {
  const { deletePlayer } = playerActions;

  if (req.method === "POST") {
    const { name } = req.body;
    console.log("Destructured:", name);
    deletePlayer(name);
  }
  res.status(200).json({ deleted: "Sucess" });
}
