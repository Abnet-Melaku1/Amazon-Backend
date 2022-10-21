const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const stripe = require("stripe")(
  "sk_test_51LjSvOFbbIsGrK3OubqOrVEY1Li4TH1Am5UeWMNEL0yNmOv8bLAaV3dBp3tFROBZKG8HVNBfANvf4E0mio5nqDiC00FBrFqE6M"
);

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));
// app.get("/home", (request, response) =>
//   response.status(200).send("Abnet the coder")
// );
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(PORT, () => {
  console.log(`serever running on port: ${{ PORT }}`);
});
