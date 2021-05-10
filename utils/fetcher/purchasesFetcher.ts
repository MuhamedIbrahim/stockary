import { db } from "@/lib/firebase";

const fetcher = async (uid: string) => {
  const purchases = [];
  await db.collection("customers").doc(uid).collection("purchased").orderBy('datePurchased', 'desc').get().then(snapshot => {
    snapshot.forEach(doc => {
      purchases.push(doc.data());
    });
  }).catch(error => {
    console.error(error.message);
  });
  
  return purchases;
}

export default fetcher