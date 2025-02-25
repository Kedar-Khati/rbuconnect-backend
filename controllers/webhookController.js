import { Webhook } from "svix";
import User from "../models/User.js";

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

export const handleClerkWebhook = async (req, res) => {
  if (!WEBHOOK_SECRET) {
    return res.status(500).json({ error: "Webhook secret is missing." });
  }

  const svix_id = req.headers["svix-id"];
  const svix_timestamp = req.headers["svix-timestamp"];
  const svix_signature = req.headers["svix-signature"];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: "Missing Svix headers." });
  }

  const payload = JSON.stringify(req.body);
  const wh = new Webhook(WEBHOOK_SECRET);

  try {
    const evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });

    console.log("Received Clerk event:", evt.type);

    if (evt.type === "user.created") {
      const userData = {
        clerkId: evt.data.id,
        email: evt.data.email_addresses[0].email_address,
        username: evt.data.username || "",
        firstName: evt.data.first_name || "",
        lastName: evt.data.last_name || "",
        photo: evt.data.image_url || "",
      };

      const existingUser = await User.findOne({ clerkId: userData.clerkId });

      if (!existingUser) {
        const newUser = new User(userData);
        await newUser.save();
        console.log("New user saved to DB:", newUser);
      } else {
        console.log("User already exists in DB.");
      }
    }

    res.status(200).json({ message: "Webhook received" });
  } catch (err) {
    console.error("Webhook verification failed:", err);
    res.status(400).json({ error: "Webhook verification failed" });
  }
};
