import { Request, Response } from "express";
import { getWhalesByProtocol } from "../../../services/whale/protocolWhales";
// Define your handler function
export default function (req: Request, res: Response): void {
  try {
    let protocol = req.query.protocol as string;

    getWhalesByProtocol(protocol)
      .then((whales) => {
        res.status(200).json({
          whales,
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: "error",
        });
      });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
