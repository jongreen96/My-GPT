import { openAIModels } from '@/lib/openAI';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Input } from './input';

export default function ProductCard({ price }) {
  return (
    <label htmlFor={price}>
      <Card>
        <CardHeader className='p-2'>
          <CardTitle className='mx-auto text-xl'>
            <Input
              type='radio'
              name='credits'
              id={price}
              value={price}
              required
              className='mx-auto w-5'
            />
            {price / 100} Million Credits
            <p className='text-center text-sm text-muted-foreground'>
              £{price / 100}
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className='p-2'>
          <p>{price / 100} Million credits is equivalent to:</p>
          <ul className='list-disc pl-6'>
            <li>
              <p>
                <strong>
                  {Math.floor(
                    (
                      (price * 10_000) /
                      1.3 /
                      openAIModels['dall-e-2'].resTokens.standard['1024x1024']
                    ).toLocaleString(),
                  )}
                </strong>{' '}
                DALL-E-2 Images
              </p>
            </li>
            <li>
              <p>
                <strong>
                  {Math.floor(
                    (
                      (price * 10_000) /
                      1.3 /
                      openAIModels['dall-e-3'].resTokens.hd['1024x1024']
                    ).toLocaleString(),
                  )}
                </strong>{' '}
                DALL-E-3 Images
              </p>
            </li>
            <li>
              <p>
                <strong></strong>
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>
    </label>
  );
}
