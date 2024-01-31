const { Card, CardHeader, CardTitle, CardContent } = require('./ui/card');

export default function ChatInfo({ settings }) {
  return (
    <Card className='w-fit self-center text-brand'>
      <CardHeader>
        <CardTitle>Chat Info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex gap-2'>
          <p className='font-bold'>Model: </p>
          <p className=''>{settings.model}</p>
        </div>

        <div className='flex gap-2'>
          <p className='font-bold'>Max Tokens: </p>
          <p className=''>
            {parseInt(settings.max_tokens) !== 0
              ? settings.max_tokens
              : 'unlimited'}
          </p>
        </div>

        <div className='flex gap-2'>
          <p className='font-bold'>Temperature: </p>
          <p className=''>{settings.temperature}</p>
        </div>

        <div className='flex gap-2'>
          <p className='font-bold'>Response Format: </p>
          <p className=''>{settings.response_format || 'text'}</p>
        </div>

        <div className='flex gap-2'>
          <p className='font-bold'>Frequency Penalty: </p>
          <p className=''>{settings.frequency_penalty}</p>
        </div>

        <div className='flex gap-2'>
          <p className='font-bold'>Presence Penalty: </p>
          <p className=''>{settings.presence_penalty}</p>
        </div>

        <div className='flex gap-2'>
          <p className='font-bold'>Top P: </p>
          <p className=''>{settings.top_p}</p>
        </div>

        <div className='flex flex-col'>
          <p className='font-bold'>System Message: </p>
          <p className='max-w-xs'>{settings.system_message || 'none'}</p>
        </div>
      </CardContent>
    </Card>
  );
}
