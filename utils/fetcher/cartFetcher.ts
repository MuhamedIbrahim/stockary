import { db} from "@/lib/firebase";
import { arrayOfSimpleProductsReturn, productData } from "@/utils/dataTypes";
import { mutate } from "swr";

const fetcher = async (...[key, uid]): Promise<arrayOfSimpleProductsReturn> => {
  const customerID = uid;
  let cartProductsRef;
  if(key === "cart/all") {
    cartProductsRef = await db
      .collection("customers")
      .doc(customerID)
      .collection("cart")
      .orderBy("addedAt", "desc");
    } else {
    cartProductsRef = await db
      .collection("customers")
      .doc(customerID)
      .collection("cart")
      .orderBy("addedAt", "desc").limit(+key.split('cart/').join(''));
    }

  const cartProducts = await cartProductsRef
    .get()
    .then(snap => {
      const allProds = [];
      snap.forEach(doc => doc.exists && allProds.push(Object.assign({id: doc.id}, doc.data())));
      return allProds;
    })
    .catch(error => error.message);

    return cartProducts ? cartProducts : [];
};

export default fetcher;

export const removeProductCart = async (prodID: string, uid: string): Promise<void> => {
    const customerID = uid;
    await db
      .collection("customers")
      .doc(customerID)
      .collection("cart")
      .doc(prodID)
      .delete()
      .catch(error => console.error(error.message));
}

export const removeAllProductsCart = async (uid: string): Promise<void> => {
    const customerID = uid;
    await db
      .collection("customers")
      .doc(customerID)
      .collection("cart")
      .get()
      .then(snapshot => {
        snapshot.forEach(async doc => {
          doc.ref.delete();
        });
      })
      .then(() => {
        mutate("cart/all");
      })
      .catch(error => console.error(error.message));
}

export const addProductCart = async (product: productData, id: string | string[], addedAt: number, uid): Promise<void> => {
    const customerID = uid;
    await db
      .collection("customers")
      .doc(customerID)
      .collection("cart")
      .add({
        image: product.images[0] || '',
        price: product.salePrice ? product.salePrice : product.price,
        title: product.title,
        productID: id,
        addedAt
      })
      .catch(error => console.error(error.message));
}