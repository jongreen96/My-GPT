import TextAreaAuto from 'react-textarea-autosize';

export default function ImageGenerationInput({
  input,
  setInput,
  inputRef,
  handleSubmit,
}) {
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className='sticky bottom-0 mx-auto flex w-full max-w-7xl gap-2 p-2'
    >
      <div className='flex w-full min-w-0 flex-col rounded-[20px] border border-input bg-background px-3 py-2 shadow'>
        <TextAreaAuto
          autoFocus
          maxRows={15}
          ref={inputRef}
          value={input}
          placeholder='Say something...'
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              handleSubmit(e);
            }
          }}
          className='grow resize-none bg-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        />
      </div>
    </form>
  );
}
