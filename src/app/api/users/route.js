import { createUser, deleteUser } from '@/lib/db/queries';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

export async function POST(req) {
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature)
    return new Response('Error: Missing svix headers', { status: 400 });

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(process.env.WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (error) {
    console.error('Error verifying webhook:', error);
    return new Response('Error: Invalid svix signature', { status: 400 });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === 'user.created') {
    await createUser(id);
  } else if (eventType === 'user.deleted') {
    await deleteUser(id);
  }

  return new Response('ok', { status: 200 });
}
