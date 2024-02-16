import { NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1OkPsOJtbIKahPSUgGPdI3HM',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/settings?success=true`,
      cancel_url: `http://localhost:3000/settings?canceled=true`,
      automatic_tax: { enabled: true },
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.log(err);
  }
}
