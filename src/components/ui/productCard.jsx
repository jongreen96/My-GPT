import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Input } from './input';

export default function ProductCard({ price }) {
  return (
    <label htmlFor={price}>
      <Card>
        <CardHeader className='p-2'>
          <CardTitle className='flex flex-col items-center text-center text-xl'>
            <Input
              type='radio'
              name='credits'
              id={price}
              value={price}
              required
              className='w-5 '
            />
            {(price / 100).toLocaleString()} Million Credits
          </CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col items-center p-2'>
          <p className='text-muted-foreground'>
            £{(price / 100).toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </label>
  );
}

{
  /*    <div className='flex items-center gap-2'>
            <Input
              type='radio'
              name='credits'
              id='500'
              value='500'
              defaultChecked
              required
              className='w-fit'
            />
            <label htmlFor='500' className='whitespace-nowrap'>
              5 million
            </label>
        </div>

        <div className='flex items-center gap-2'>
            <Input
              type='radio'
              name='credits'
              id='1000'
              value='1000'
              required
              className='w-fit'
            />
            <label htmlFor='1000' className='whitespace-nowrap'>
              10 million
            </label>
        </div>

        <div className='flex items-center gap-2'>
            <Input
              type='radio'
              name='credits'
              id='2000'
              value='2000'
              required
              className='w-fit'
            />
            <label htmlFor='2000' className='whitespace-nowrap'>
              20 million
            </label>
        </div> */
}
