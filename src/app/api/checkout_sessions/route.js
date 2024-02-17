import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const { userId } = auth();
  const body = await req.text();
  const credits = body.split('=')[1];

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: `${(credits * 10000).toLocaleString()} Credits`,
              description: `${credits * 10000} credits`,
            },
            unit_amount: credits,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.BASE_URL}/settings?success=true`,
      cancel_url: `${process.env.BASE_URL}/settings?canceled=true`,
      automatic_tax: { enabled: true },
      client_reference_id: userId,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.log(err);
  }
}
