// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { playerActions } from "../../data/players-crud";

export default function handler(req, res) {
  const { getAll, addPlayer } = playerActions;

  if (req.method === "POST") {
    console.log("BODY:", req.body);
    const { name, x } = req.body;

    const newUser = { name: name, x: x };
    console.log(newUser);
    addPlayer(newUser);
  }
  res.status(200).json({ name: "John Doe" });
}
