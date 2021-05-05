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
    client_reference_id: data[1],
    success_url: `http://localhost:3000/checkout-success?&id=${data[0].map((item) => item.id).join("&id=")}`,
    cancel_url: "http://localhost:3000",
  }).then(() => {
    admin.firestore().collection("users").doc(data[1]).update({
      purchased: admin.firestore.FieldValue.arrayUnion(...data[0]),
    });
  });

  return {
    id: session.id,
  };
});
