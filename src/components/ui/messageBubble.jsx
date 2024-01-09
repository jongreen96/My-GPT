export function UserChatBubble({ message }) {
  return (
    <div className='flex max-w-[90%] flex-col self-end rounded-lg rounded-br-none bg-primary p-2'>
      <span className='text-white'>{message.content}</span>
    </div>
  );
}

export function AssistantChatBubble({ message }) {
  return (
    <div className='flex max-w-[90%] flex-col rounded-lg rounded-bl-none bg-secondary p-2'>
      <span className='whitespace-pre-wrap'>{message.content}</span>
    </div>
  );
}
