import { db } from "@/lib/firebase";
import { addProductCartParams, arrayOfSimpleProductsReturn, SimpleProduct } from "@/utils/dataTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const cartFetcher = createAsyncThunk('fetch/cart', async (uid: string): Promise<arrayOfSimpleProductsReturn> => {
  const cartProducts = await db
  .collection("customers")
  .doc(uid)
  .collection("cart")
  .orderBy("addedAt", "desc")
  .get()
  .then(snap => {
    const allProds = [];
    snap.forEach(doc => doc.exists && allProds.push(Object.assign({id: doc.id}, doc.data())));
    return allProds;
  })
  .catch(error => { console.error(error.message); });

  return cartProducts ? cartProducts : [];
});

export const cartRemoveProduct = createAsyncThunk('update/cart', async ({cartProdID, uid}: {cartProdID: string, uid: string}): Promise<string> => {
  await db
    .collection("customers")
    .doc(uid)
    .collection("cart")
    .doc(cartProdID)
    .delete()
    .catch(error => { console.error(error.message); });
  
  return cartProdID;
});

export const cartAddProduct = createAsyncThunk('add/cart', async ({product, id, addedAt, uid}: addProductCartParams): Promise<SimpleProduct> => {
  const newCartProductRef = db
  .collection("customers")
  .doc(uid)
  .collection("cart")
  .doc();

  const cartProduct = {
    image: product.images[0] || '',
    price: product.salePrice ? +product.salePrice : +product.price,
    title: product.title,
    productID: id,
    addedAt
  };

  await db
    .collection("customers")
    .doc(uid)
    .collection("cart")
    .doc(newCartProductRef.id)
    .set(cartProduct)
    .catch(error => { console.error(error.message); });

  return {
    ...cartProduct,
    id: newCartProductRef.id
  }
});

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: {
    cart: [],
    isLoading: true
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(cartFetcher.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(cartFetcher.fulfilled, (state, action) => {
      state.cart = action.payload;
      state.isLoading = false;
    });
    builder.addCase(cartFetcher.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(cartRemoveProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(cartRemoveProduct.fulfilled, (state, action) => {
      state.cart = state.cart.filter(cartProd => cartProd.id !== action.payload);
      state.isLoading = false;
    });
    builder.addCase(cartRemoveProduct.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(cartAddProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(cartAddProduct.fulfilled, (state, action) => {
      state.cart = [action.payload, ...state.cart];
      state.isLoading = false;
    });
    builder.addCase(cartAddProduct.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const selectAllCart = state => ({
  cart: state.cart.cart,
  isLoading: state.cart.isLoading
});

export default cartSlice.reducer;