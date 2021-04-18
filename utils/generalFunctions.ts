export const cloneAllProductsFilterState = (state) => {
  const newState = Object.assign(
    {},
    {
      category: state.category.map(cat => Object.assign({}, cat)),
      condition: [...state.condition],
      price: state.price,
    }
  );

  return newState;
}

export const cleanFilterString = (string: string): string => {
  return string.split(" ")
  .filter((char) => char !== "&")
  .join("_")
}

export const restoreFilterString = (string: string): string => {
  return string.split("_")
  .join(" ")
}

export const restructureProductsReturnedData = (returnedData) => {
  const updateProductsData = (prod) => {
    let updatedProd = Object.assign({}, prod);
    updatedProd.images = [...prod.images];
    updatedProd.retailer = Object.assign({}, prod.retailer);
    if(prod.details && Object.keys(prod.details).length > 0) {
      updatedProd.details = Object.keys(prod.details).map(key => Object.assign({id: key}, prod.details[key]));
    } else {
      updatedProd.details = [];
    }
    if(prod.reviews && Object.keys(prod.reviews).length > 0) {
      updatedProd.reviews = Object.keys(prod.reviews).map(key => Object.assign({id: key}, prod.reviews[key]));
    } else {
      updatedProd.reviews = [];
    }
    return updatedProd;
  }

  const updatedData = returnedData.map(updateProductsData);
  return updatedData;
}