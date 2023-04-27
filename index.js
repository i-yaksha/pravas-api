import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = 19001;

const SECRET_KEY = `${process.env.SECRET_KEY}`;

const stripe = Stripe(SECRET_KEY, { apiVersion: "2022-08-01" });

app.listen(port, () => {
  console.log(`app listening at http://127.0.0.1:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      description: "Software development services",
      shipping: {
        name: "Jenny Rosen",
        address: {
          line1: "510 Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US"
        }
      },
      amount: 1099,
      currency: "usd",
      payment_method_types: ["card"]
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});
