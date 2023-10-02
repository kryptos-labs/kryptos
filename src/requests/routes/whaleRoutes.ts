import express from "express";
import getWhalesByProtocol from "../handlers/whale/getWhaleByProtocolHandler"; // Import your handler function
import getAllWhales from "../handlers/whale/getAllWhalesHandler";
const router = express.Router();

// Define your routes
router.get("/getwhalesbyprotocol", getWhalesByProtocol);
router.get("/getallwhales", getAllWhales);

// Export the router
export default router;
