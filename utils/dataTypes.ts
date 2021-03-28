type simpleProductData = {
  image: string
  price: string
  title: string
  productID: string
}

interface arrayOfSimpleProducts extends simpleProductData { 
  id: string
};

export type arrayOfSimpleProductsReturn = arrayOfSimpleProducts[] | [];

export type simpleProductProps = {
  product: simpleProductData
};

export type arrayOfCategoriesReturn = {
  id: string
  name: string
  products: string[]
}[] | [];