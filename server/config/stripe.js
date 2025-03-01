const stripe = require("stripe");

const Stripe = stripe(process.env.STRIPE_SECRET_KEY);

module.exports = Stripe;

// Download the Stripe CLI and connect to your Stripe account
// stripe login

// Transfer events to your destination
// stripe listen --forward-to localhost:2410/api/order/webhook

// Triggering Events with the Command Line Interface
// stripe trigger payment_intent.succeeded
