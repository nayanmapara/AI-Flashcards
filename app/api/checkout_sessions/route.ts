import { NextResponse } from "next/server";
import Stripe from "stripe";

// Function to format the amount for Stripe
const formatAmountForStripe = (amount: number, currency: string): number => {
  return Math.round(amount * 100);
};

// Initialize the Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request): Promise<NextResponse> {
  try {
    // Define parameters for the checkout session
    const params: Stripe.Checkout.SessionCreateParams = {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Pro subscription",
            },
            unit_amount: formatAmountForStripe(10, "usd"), // pricing for subscription
            recurring: {
              interval: "month",
              interval_count: 1,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.get(
        "Referer"
      )}result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get(
        "Referer"
      )}result?session_id={CHECKOUT_SESSION_ID}`,
    };

    // Create the checkout session
    const checkoutSession = await stripe.checkout.sessions.create(params);

    // Return the checkout session as JSON
    return NextResponse.json(checkoutSession, { status: 200 });
  } catch (error: any) {
    console.error("Error creating checkout session:", error);
    return new NextResponse(
      JSON.stringify({ error: { message: error.message } }),
      { status: 500 }
    );
  }
}

export async function GET(req: Request): Promise<NextResponse> {
  const searchParams = new URL(req.url).searchParams;
  const session_id = searchParams.get("session_id");

  try {
    if (!session_id) {
      throw new Error("Session ID is required");
    }

    // Retrieve the checkout session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

    // Return the checkout session as JSON
    return NextResponse.json(checkoutSession);
  } catch (error: any) {
    console.error("Error retrieving checkout session:", error);
    return NextResponse.json(
      { error: { message: error.message } },
      { status: 500 }
    );
  }
}
