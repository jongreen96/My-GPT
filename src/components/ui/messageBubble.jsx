export function UserChatBubble({ message }) {
  return (
    <div className='relative flex max-w-[90%] flex-col self-end rounded-[20px] bg-primary p-2 px-3'>
      <span className='text-white'>{message.content}</span>
      <div className='absolute bottom-[-2px] right-[-2px] -z-10 h-0 w-0 -rotate-12 border-b-[10px] border-r-[15px] border-t-[10px] border-b-transparent border-r-primary border-t-transparent'></div>
    </div>
  );
}

export function AssistantChatBubble({ message }) {
  return (
    <div className='relative flex w-fit max-w-[90%] flex-col rounded-[20px] bg-secondary p-2 px-3'>
      <span className='whitespace-pre-wrap'>{message.content}</span>
      <div className='absolute bottom-[-2px] left-[-2px] z-10 h-0 w-0 rotate-12 border-b-[10px] border-l-[15px] border-t-[10px] border-b-transparent border-l-secondary border-t-transparent'></div>
    </div>
  );
}
