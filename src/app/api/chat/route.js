import { streamConversation } from '@/lib/openAI';
import { StreamingTextResponse } from 'ai';

export async function POST(req) {
  try {
    const stream = await streamConversation(req);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log(error);
  }
}
