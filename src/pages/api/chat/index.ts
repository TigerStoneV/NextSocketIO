import { NextApiRequest, NextApiResponse } from "next";
import { NextApiResponseServerIo } from "../socket/io";

const handler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (req.method === "POST") {
    const message = req.body;

    if (!message) {
      res.status(400).json({ error: "Message content is required" });
      return;
    }

    if (res.socket.server.io) {
      res.socket.server.io.emit("message", message);
      res.status(200).json({ success: true, message });
    } else {
      res.status(500).json({ error: "Socket.io server is not initialized" });
    }

    console.log("Broadcasting message:", message);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default handler;
