import { NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1OjjPiJtbIKahPSUQEAeSZsa',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://my-gpt-next-one.vercel.app/settings?success=true`,
      cancel_url: `https://my-gpt-next-one.vercel.app/settings/?canceled=true`,
    });

    return NextResponse.redirect(session.url);
  } catch (err) {
    console.log(err);
  }
}
