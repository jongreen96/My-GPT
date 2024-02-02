export default function ChatInfo({ settings }) {
  return (
    <div className='space-y-2'>
      <h3 className='font-semibold'>Chat Info</h3>
      <div className='flex justify-between gap-2'>
        <div>
          <div className='flex justify-between gap-2'>
            <p className='font-semibold'>Model: </p>
            <p className=''>{settings.model}</p>
          </div>

          <div className='flex justify-between gap-2'>
            <p className='font-semibold'>Max Tokens: </p>
            <p className=''>
              {parseInt(settings.max_tokens) !== 0
                ? settings.max_tokens
                : 'unlimited'}
            </p>
          </div>

          <div className='flex justify-between gap-2'>
            <p className='font-semibold'>Temperature: </p>
            <p className=''>{settings.temperature}</p>
          </div>

          <div className='flex justify-between gap-2'>
            <p className='font-semibold'>Response Format: </p>
            <p className=''>{settings.response_format || 'text'}</p>
          </div>
        </div>

        <div>
          <div className='flex justify-between gap-2'>
            <p className='font-semibold'>Frequency Penalty: </p>
            <p className=''>{settings.frequency_penalty}</p>
          </div>

          <div className='flex justify-between gap-2'>
            <p className='font-semibold'>Presence Penalty: </p>
            <p className=''>{settings.presence_penalty}</p>
          </div>

          <div className='flex justify-between gap-2'>
            <p className='font-semibold'>Top P: </p>
            <p className=''>{settings.top_p}</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <p className='font-semibold'>System Message: </p>
        <p>{settings.system_message || 'none'}</p>
      </div>
    </div>
  );
}
