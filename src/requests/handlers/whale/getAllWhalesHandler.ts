import { Request, Response } from "express";
import {
  getAllWhales,
  getWhalesByProtocol,
} from "../../../services/whale/protocolWhales";
// Define your handler function
export default function (req: Request, res: Response): void {
  try {
    getAllWhales()
      .then((allWhales) => {
        if (allWhales) {
          const allWhalesArray = Array.from(allWhales);
          res.status(200).json({
            allWhales: {
              ...Object.fromEntries(allWhalesArray),
            },
          });
        } else {
          throw new Error("No whales found");
        }
      })
      .catch((error) => {
        res.status(400).json({
          error: error.lineNumber + " " + error.message,
        });
      });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
