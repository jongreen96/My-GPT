import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const body = await req.text();
  const headersList = headers();
  const sig = headersList.get('stripe-signature');
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
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
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response('ok', { status: 200 });
}

async function fulfillOrder(session) {
  const { amount_total, customer_details, line_items } = session;
  console.log(`Fulfilling order for ${customer_details.email}`);
  console.log(`Total: ${amount_total}`);
  console.log('Line items:', line_items.data);
}
