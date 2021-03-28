import { db } from "@/lib/firebase";
import { arrayOfCategoriesReturn } from "@/utils/dataTypes";

const fetcher = async (key: string): Promise<arrayOfCategoriesReturn> => {
    if(key === 'all') {
        return await db
        .collection("categories")
        .orderBy("products", "desc")
        .get()
        .then(snap => {
            const allDocs = [];
            snap.forEach(doc => allDocs.push(Object.assign({id: doc.id}, doc.data())))
            return allDocs
        })
        .catch(error => error);
    } else {
        return await db
          .collection("categories")
          .doc(key)
          .get()
          .then(doc => {
              if(doc.exists) {
                  Object.keys(doc.data()).length ? Object.assign({id: doc.id}, doc.data()) : {}
              } else {
                  return {};
              }
            })
          .catch(error => error);
    }
};

export default fetcher;
