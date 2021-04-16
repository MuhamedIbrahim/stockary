import { db } from "@/lib/firebase";

export default async (req, res) => {
  let products = [];
  await db
    .collection("products")
    .get()
    .then(snap => {
      const docs = [];
      snap.forEach(doc => docs.push(Object.assign({id: doc.id}, doc.data())));
      products = docs;
    });
  res.status(200).json(products);
};
