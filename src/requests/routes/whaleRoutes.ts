import express from "express";
import getWhalesByProtocol from "../handlers/whale/getWhaleByProtocolHandler"; // Import your handler function

const router = express.Router();

// Define your routes
router.get("/getwhalesbyprotocol", getWhalesByProtocol);

// Export the router
export default router;
