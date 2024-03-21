export default function ChatInfo({ settings, type }) {
  if (type === 'chat')
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
              <p className=''>{settings.response_format ? 'JSON' : 'text'}</p>
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

            <div className='flex justify-between gap-2'>
              <p className='font-semibold'>High Res Vision: </p>
              <p className=''>
                {settings?.high_res_vision?.toString() || 'false'}
              </p>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <p className='font-semibold'>System Message: </p>
          <p>{settings.system_message || 'none'}</p>
        </div>
      </div>
    );

  if (type === 'image')
    return (
      <div className=''>
        <div className='flex justify-between gap-2'>
          <p className='font-semibold'>Model: </p>
          <p className=''>{settings.imageModel}</p>
        </div>

        <div className='flex justify-between gap-2'>
          <p className='font-semibold'>Number of Images: </p>
          <p className=''>{settings.n}</p>
        </div>

        <div className='flex justify-between gap-2'>
          <p className='font-semibold'>Size: </p>
          <p className=''>{settings.size}</p>
        </div>

        <div className='flex justify-between gap-2'>
          <p className='font-semibold'>quality: </p>
          <p className=''>{settings.quality}</p>
        </div>

        <div className='flex justify-between gap-2'>
          <p className='font-semibold'>Style: </p>
          <p className=''>{settings.style}</p>
        </div>
      </div>
    );

  return null;
}
