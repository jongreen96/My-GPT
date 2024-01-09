export function UserChatBubble({ message }) {
  return (
    <div className='flex w-fit flex-col self-end rounded-lg rounded-br-none bg-primary p-2'>
      <span className='text-white'>{message.content}</span>
    </div>
  );
}

export function AssistantChatBubble({ message }) {
  return (
    <div className='flex w-fit flex-col rounded-lg rounded-bl-none bg-neutral-600 p-2'>
      <span className='whitespace-pre-wrap text-white'>{message.content}</span>
    </div>
  );
}
