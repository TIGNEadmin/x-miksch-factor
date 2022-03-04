// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { playerActions } from "../../tmp/players-crud";

export default function handler(req, res) {
  const { newRound } = playerActions;

  if (req.method === "GET") {
    newRound();
  }
  res.status(200).json({ name: "John Doe" });
}
