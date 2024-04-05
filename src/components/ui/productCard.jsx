import { openAIModels } from '@/lib/openAI';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Input } from './input';

export default function ProductCard({ price }) {
  return (
    <label htmlFor={price}>
      <Card>
        <CardHeader className='rounded-t-lg bg-muted p-2'>
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
                  <TextCalculation price={price} model='gpt-3.5-turbo' />
                </strong>{' '}
                GPT-3.5 Turbo words
              </p>
            </li>

            <li>
              <p>
                <strong>
                  <TextCalculation price={price} model='gpt-4-turbo-preview' />
                </strong>{' '}
                GPT-4 Turbo / Vision words
              </p>
            </li>

            <li>
              <p>
                <strong>
                  <TextCalculation price={price} model='gpt-4' />
                </strong>{' '}
                GPT-4 words
              </p>
            </li>

            <br />

            <li>
              <p>
                <strong>
                  <ImageCalculation
                    price={price}
                    model={
                      openAIModels['dall-e-2'].resTokens.standard['1024x1024']
                    }
                  />
                </strong>{' '}
                DALL-E-2 Images
              </p>
            </li>

            <li>
              <p>
                <strong>
                  <ImageCalculation
                    price={price}
                    model={
                      openAIModels['dall-e-3'].resTokens.standard['1024x1024']
                    }
                  />
                </strong>{' '}
                DALL-E-3 Images
              </p>
            </li>

            <li>
              <p>
                <strong>
                  <ImageCalculation
                    price={price}
                    model={openAIModels['dall-e-3'].resTokens.hd['1024x1024']}
                  />
                </strong>{' '}
                DALL-E-3 HD Images
              </p>
            </li>
          </ul>

          <p className='text-sm text-muted-foreground'>
            * Words based on 75% word to response token ratio
          </p>
          <p className='text-sm text-muted-foreground'>
            * Image numbers based on 1024x1024 resolution
          </p>
        </CardContent>
      </Card>
    </label>
  );
}

function ImageCalculation({ price, model }) {
  return Math.floor((price * 10_000) / (model * 1.3)).toLocaleString();
}

function TextCalculation({ price, model }) {
  return Math.floor(
    ((price * 10_000) / (openAIModels[model].resTokens * 1.3)) * 0.75,
  ).toLocaleString();
}
