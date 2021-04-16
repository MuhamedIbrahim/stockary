import { db, auth } from "@/lib/firebase";
import {popularProducts} from "stockary_config";
import { productDataReturn, productsFetcherParams } from "../dataTypes";
import {restoreFilterString, restructureProductsReturnedData} from '../generalFunctions';

const fetcher = async (...[key, filter]: productsFetcherParams): Promise<productDataReturn> => {
  let products = [];
  if(key === 'products/popular') {
  await db
    .collection("products")
    .where("purchases", ">", popularProducts)
    .orderBy("purchases", "desc")
    .limit(12)
    .get()
    .then(snap => {
      const docs = [];
      snap.forEach(doc => docs.push(Object.assign({id: doc.id}, doc.data())));
      products = restructureProductsReturnedData(docs);
    });
  } else if(key === 'products/filter') {
    let cat = [];
    let cond = [];
    let price = "";
    if(filter?.cat) {
      cat = Array.isArray(filter.cat) ? filter.cat : [filter.cat];
    }
    if(filter?.cond) {
      cond = Array.isArray(filter.cond) ? filter.cond : [filter.cond];
      cond = cond.map(elm => restoreFilterString(elm))
    }
    if(filter?.price) {
      price = filter.price;
    }

    let fetchRef = db.collection("products");

    if(cat.length > 0) {
      fetchRef = fetchRef.where('categoryID', 'in', cat);
    }
    
    if(cond.length > 0) {
      fetchRef = fetchRef.where("condition", 'array-contains-any', cond);
    }
    
    await fetchRef
    .limit(12)
    .get()
    .then(snap => {
      const docs = [];
      snap.forEach(doc => docs.push(Object.assign({id: doc.id}, doc.data())));
      products = restructureProductsReturnedData(docs);
    });
  } else {
    await db
    .collection("products")
    .doc(key.split('products/').join(''))
    .get()
    .then(doc => {
      products = [restructureProductsReturnedData(doc.data())];
    });
  }
  
  return products;
}

export const toggleProductsShow = (showStyle, setState) => {
  setState(showStyle);
  localStorage.setItem("stockaryShowStyle", JSON.stringify(showStyle));
}

export const getCachedProductsShow = (setState) => {
  const showStyle = localStorage.getItem("stockaryShowStyle");
  setState(JSON.parse(showStyle) || "list");
}

export default fetcher;