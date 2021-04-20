import "dotenv/config";
import { VercelRequest, VercelResponse } from "@vercel/node";
import connectToDatabase from "../../utils/connectToDb";

export default async function (req: VercelRequest, res: VercelResponse) {
  const { slug } = req.query;
  const db = await connectToDatabase(process.env.MONGO_CONNECTION_URL);
  const collection = db.collection("products");
  const products = await collection.find({ slug }).toArray();

  res.status(200).json({ products });
}
