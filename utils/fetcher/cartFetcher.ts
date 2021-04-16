import { db, auth } from "@/lib/firebase";
import { arrayOfSimpleProductsReturn, productData } from "@/utils/dataTypes";

const fetcher = async (key: string): Promise<arrayOfSimpleProductsReturn> => {
  const customerID = auth.currentUser.uid;
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

    return Array.isArray(cartProducts) ? cartProducts : [];
};

export default fetcher;

export const removeProductCart = async (prodID: string): Promise<void> => {
    const customerID = auth.currentUser.uid;
    await db
      .collection("customers")
      .doc(customerID)
      .collection("cart")
      .doc(prodID)
      .delete()
      .catch(error => console.error(error.message));
}

export const addProductCart = async (product: productData, id: string | string[], addedAt: number): Promise<void> => {
    const customerID = auth.currentUser.uid;
    await db
      .collection("customers")
      .doc(customerID)
      .collection("cart")
      .add({
        image: product.images[0] || '',
        price: product.price,
        title: product.title,
        productID: id,
        addedAt
      })
      .catch(error => console.error(error.message));
}