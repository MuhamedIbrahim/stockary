import { db } from "@/lib/firebase";
import { arrayOfSimpleProductsReturn } from "@/utils/dataTypes";

const fetcher = async (key: string): Promise<arrayOfSimpleProductsReturn> => {
  const customerID = "tikjDkHOqWKj1w6IKJsi";
  return await db
    .collection("customers")
    .doc(customerID)
    .get()
    .then(doc => {
      if(doc.exists) {
        return Object.keys(doc.data()).length ? Object.entries(doc.data()[key]).map(elm => Object.assign({id: elm[0]}, elm[1])) : [];
      } else {
        return ([]);
      }
    })
    .catch(error => error);
};

export default fetcher;
