import { mongooseConnect } from "@/lib/mongoose";
import { Contact } from "@/models/Contact";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();
  
  if (method === "GET") {
    try {
      const contacts = await Contact.find({}).sort({ createdAt: -1 });
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}