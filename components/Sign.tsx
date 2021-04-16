import { auth, db } from "@/lib/firebase";
import { onUpdateFavProductsHandler } from "@/utils/fetcher/favsFetcher";
import { useAuth } from "@/utils/useAuth";
import { mutate } from "swr";

const Sign = () => {
  const { user, signin, signout } = useAuth();

  const mutationHandler = async () => {
    let newCatProdID = "";
    const newProduct = {
      title: "New product 444",
      price: "175.12",
      productID: "42",
      image: "link",
      addedAt: Date.now(),
    };
    await db
      .collection("customers")
      .doc(user.uid)
      .collection("cart")
      .add(newProduct)
      .then((doc) => {
        newCatProdID = doc.id;
      });
    mutate(
      "cart/all",
      (currentCart) => {
        return [
          {
            id: newCatProdID,
            ...newProduct,
          },
          ...Array.from(currentCart),
        ];
      },
      false
    );
  };

  const addFavourite = () => {
    onUpdateFavProductsHandler(
      {
        title: "New product 3",
        price: "240.99",
        image: "link",
        productID: "3",
        id: Date.now() + 2,
      },
      "add"
    );
    mutate("favs");
  };

  return (
    <div>
      {user?.email}
      {!user?.email ? (
        <button onClick={signin}>Sign in</button>
      ) : (
        <button onClick={signout}>Sign out</button>
      )}
      <button onClick={mutationHandler}>mutate</button>
      <button onClick={addFavourite}>add favs</button>
    </div>
  );
};

export default Sign;
