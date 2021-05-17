const functions = require("firebase-functions");
const stripe = require("stripe")(functions.config().stripe.secret_key);
const admin = require("firebase-admin");

admin.initializeApp();

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: data[0].map((item) => (
      {
        name: item.title,
        images: [item.image],
        amount: item.price * 100,
        currency: "usd",
        quantity: item.quantity,
      }
    )),
    mode: "payment",
    success_url: "https://stockary.vercel.app/checkout-success",
    cancel_url: "https://stockary.vercel.app/profile/cart",
  }).then((res) => {
    data[0].forEach((item) => {
      admin.firestore().collection("products").doc(item.id).update({
        purchases: admin.firestore.FieldValue.increment(item.quantity),
      });
    });
    return res;
  }).then((res) => {
    admin.firestore().collection("customers").doc(data[1])
        .collection("purchased").add({
          datePurchased: Date.now(),
          products: data[0],
        });
    return res;
  }).then((res) => {
    admin.firestore().collection("customers").doc(data[1])
        .collection("cart")
        .get()
        .then((snapshot) => {
          snapshot.forEach(async (doc) => {
            await doc.ref.delete();
          });
        });
    return res;
  });

  return {
    id: session.id,
  };
});
