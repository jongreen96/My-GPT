import { streamConversation } from '@/lib/openAI';
import { StreamingTextResponse } from 'ai';

export const maxDuration = 300;

export async function POST(req) {
  try {
    const body = await req.json();
    const stream = await streamConversation(body);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);
  }
}
