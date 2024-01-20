import { cn, markdownComponents } from '@/lib/utils';
import Markdown from 'react-markdown';

export default function MessageBubble({ message }) {
  return (
    <div
      className={cn(
        'relative flex max-w-[90%] flex-col rounded-[20px] p-2 px-3',
        message.role === 'user' && 'self-end bg-primary',
        message.role === 'assistant' && 'w-fit bg-secondary',
      )}
    >
      <span
        className={cn(
          message.role === 'user' && 'text-white',
          message.role === 'assistant' && 'markdown whitespace-pre-wrap',
        )}
      >
        <Markdown components={markdownComponents}>{message.content}</Markdown>
      </span>
      <div
        className={cn(
          'absolute bottom-[-2px] -z-10 h-0 w-0 border-b-[10px] border-t-[10px] border-b-transparent border-t-transparent',
          message.role === 'user' &&
            'right-[-2px] -rotate-12 border-r-[15px] border-r-primary',
          message.role === 'assistant' &&
            'left-[-2px] rotate-12 border-l-[15px] border-l-secondary',
        )}
      ></div>
    </div>
  );
}
