import { streamConversation } from '@/lib/openAI';
import { StreamingTextResponse } from 'ai';

export const runtime = 'edge';
// FIXME: See why this is 1.5MB on build
export async function POST(req) {
  try {
    const stream = await streamConversation(req);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);
  }
}
