// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { playerActions } from "../../tmp/players-crud";

export default function handler(req, res) {
  const { submitX } = playerActions;

  if (req.method === "POST") {
    const { name } = req.body;
    submitX(name);
  }
  res.status(200).json({ response: "Success" });
}
