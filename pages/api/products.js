import { db } from "@/lib/firebase";

export default async (req, res) => {
  let data = {};
  await db
    .collection("products")
    .get()
    .then((query) => query.forEach((doc) => (data = doc.data())));
  res.status(200).json(data);
};
