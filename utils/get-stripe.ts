import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const publishableKey = process.env
      .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

export default getStripe;
