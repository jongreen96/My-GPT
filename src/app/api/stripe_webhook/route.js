import { addTransaction, increaseUserCredits } from '@/lib/db/queries';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.text();
  const headersList = headers();
  const sig = headersList.get('stripe-signature');
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.log(err);
    return new Response('Webhook Error', { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ['line_items'],
        },
      );

      await fulfillOrder(sessionWithLineItems);
      break;
  }

  return new Response('ok', { status: 200 });
}

async function fulfillOrder(session) {
  const { amount_total, client_reference_id } = session;

  await increaseUserCredits(client_reference_id, amount_total);
  await addTransaction(client_reference_id, amount_total);
}
