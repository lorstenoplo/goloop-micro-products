import "dotenv/config";
import { VercelRequest, VercelResponse } from "@vercel/node";
import connectToDatabase from "../../utils/connectToDb";
import { ObjectId } from "mongodb";

export default async function (req: VercelRequest, res: VercelResponse) {
  const db = await connectToDatabase(process.env.MONGO_CONNECTION_URL);
  const collection = await db.collection("products");

  const { productId } = req.query;

  collection.findOne(
    { _id: new ObjectId(productId as string) },
    (err: any, product: any) => {
      console.log(err);
      res.status(200).json({ product });
    }
  );
}
