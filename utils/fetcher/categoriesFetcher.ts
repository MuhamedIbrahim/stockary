import { db } from "@/lib/firebase";
import { arrayOfCategoriesReturn } from "@/utils/dataTypes";
import {popularCategories} from "stockary_config";

const fetcher = async (...[key, returnType = ""]): Promise<arrayOfCategoriesReturn> => {
    let catResponse = [];
    if(key === 'categories/all') {
        await db
        .collection("categories")
        .orderBy("products", "desc")
        .get()
        .then(snap => {
            const allDocs = [];
            snap.forEach(doc => allDocs.push(Object.assign({id: doc.id}, doc.data())))
            if(returnType === 'filter') {
                catResponse =  allDocs.map(doc => ({
                    id: doc.id,
                    value: doc.name,
                    checked: false
                }));
            } else {
                catResponse =  allDocs;
            }
        })
        .catch(error => error.message);
    } else if(key === 'categories/popular') {
        await db
        .collection("categories")
        .where("productsNumber", ">", popularCategories)
        .orderBy("productsNumber", "desc")
        .limit(10)
        .get()
        .then(snap => {
            const allDocs = [];
            snap.forEach(doc => allDocs.push(Object.assign({id: doc.id}, doc.data())))
            catResponse = allDocs
        })
        .catch(error => error.message);
    } else {
        await db
          .collection("categories")
          .doc(key.split('categories/').join(''))
          .get()
          .then(doc => {
              if(doc.exists) {
                  Object.keys(doc.data()).length ? Object.assign({id: doc.id}, doc.data()) : {}
              } else {
                  return {};
              }
            })
          .catch(error => error.message);
    }

    return catResponse || [];
};

export default fetcher;
