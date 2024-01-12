import { createUser, deleteUser } from '@/lib/db/queries';

export async function POST(req) {
  const {
    data: { id },
    type,
  } = await req.json();

  if (type === 'user.deleted') {
    const user = await deleteUser(id);

    user
      ? Response.json({ user }, { status: 200 })
      : Response.json({ error: 'User not found' }, { status: 404 });
  }

  if (type === 'user.created') {
    const user = await createUser(id);

    user
      ? Response.json({ user }, { status: 201 })
      : Response.json({ error: 'User not found' }, { status: 404 });
  }

  return Response.json({ error: 'Unknown Request' }, { status: 400 });
}
