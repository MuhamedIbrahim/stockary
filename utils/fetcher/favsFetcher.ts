import { arrayOfSimpleProductsReturn } from "../dataTypes";

const fetcher = (key: string): arrayOfSimpleProductsReturn => {
  if(localStorage.getItem("stockaryFavProds")) {
    return JSON.parse(localStorage.getItem("stockaryFavProds"));
  } else {
    return [];
  }
}

export default fetcher;

export const onUpdateFavProductsHandler = (product, state, productID) => {
    const favProductsCached = JSON.parse(
      localStorage.getItem("stockaryFavProds") || "[]"
    );
    let updatedFavProducts = [];
    if (state === "add") {
      const productToAdd = {
        id: Date.now(),
        productID,
        image: product.images[0],
        price: product.price,
        salePrice: product.salePrice,
        title: product.title
      };
      updatedFavProducts = [productToAdd, ...favProductsCached];
    } else if (state === "remove") {
      updatedFavProducts = favProductsCached.filter(
        (prod) => prod.productID !== productID
      );
    }
    localStorage.setItem(
      "stockaryFavProds",
      JSON.stringify(updatedFavProducts)
    );
    return updatedFavProducts;
}