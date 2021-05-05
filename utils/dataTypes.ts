type simpleProductData = {
  image: string
  price: number
  salePrice?: number
  title: string[]
  productID: string,
  addedAt?: number
}

export interface SimpleProduct extends simpleProductData { 
  id: string
};

export type arrayOfSimpleProductsReturn = SimpleProduct[] | [];

export type simpleProductProps = {
  product: simpleProductData,
  onRemoved: (id: string) => void,
  mutationID: string
};

type categoryData = {
id: string
name: string
products: string[],
productsNumber: number
}

export type arrayOfCategoriesReturn = categoryData[] | [] ;

type productsQuery = {
  cat: string[]
  cond: string[]
  price: string
}

export type productsFetcherParams = [
  string,
  productsQuery?,
  string?
]

export type productData = {
  categoryID: string
  condition: string[]
  description: string
  details: {
    id: string,
    key: string
    value: string
  }[]
  images: string[]
  onsale: boolean
  price: string
  purchases: number
  retailer: {
    id: string
    image: string
    name: string
  }
  reviews: {
    id: string
    rating: number
    review: string
    reviewer: string
  }[]
  salePrice: string | null
  title: string[]
}

export type productDataReturn = productData[] | []