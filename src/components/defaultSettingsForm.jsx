'use client';

import { updateDefaultChatSettingsAction } from '@/app/actions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { openAIModels } from '@/lib/openAI';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import LoadingButton from './ui/loadingButton';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export default function DefaultSettingsForm({ user }) {
  const models = Object.entries(openAIModels);
  const {
    temperature,
    top_p,
    presence_penalty,
    frequency_penalty,
    response_format,
  } = user?.defaultSettings || {};

  const [formState, setFormState] = useState({
    temperature,
    top_p,
    presence_penalty,
    frequency_penalty,
    response_format,
  });

  return (
    <Tabs defaultValue='chat' className='w-full'>
      <TabsList className='w-full'>
        <TabsTrigger value='chat' className='w-full'>
          Chat
        </TabsTrigger>

        <TabsTrigger value='image' className='w-full'>
          Image
        </TabsTrigger>

        <TabsTrigger value='voice' className='w-full'>
          Voice
        </TabsTrigger>
      </TabsList>

      <TabsContent value='chat'>
        <form
          action={updateDefaultChatSettingsAction}
          className='flex flex-col gap-2'
        >
          <div>
            <Label htmlFor='default_model'>Default Model</Label>
            <Select name='model' defaultValue={user?.defaultSettings.model}>
              <SelectTrigger>
                <SelectValue
                  placeholder={user?.defaultSettings.model}
                ></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {models
                  .filter((model) => model[1].type === 'chat')
                  .map((model) => (
                    <SelectItem key={model[0]} value={model[0]}>
                      {model[0]}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor='system_message'>System message:</Label>
            <Input
              id='system_message'
              name='system_message'
              defaultValue={user?.defaultSettings.system_message}
            />
          </div>

          <div>
            <Label htmlFor='max_tokens'>Max tokens:</Label>
            <Input
              id='max_tokens'
              name='max_tokens'
              type='number'
              min={0}
              defaultValue={
                Number(user?.defaultSettings.max_tokens) === 0
                  ? ''
                  : user.defaultSettings.max_tokens
              }
              placeholder='unlimited'
            />
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <Label htmlFor='temperature'>Temperature: </Label>
              {formState.temperature}
            </div>
            <Slider
              id='temperature'
              name='temperature'
              min={0}
              max={2}
              step={0.1}
              value={[formState.temperature]}
              onValueChange={(value) =>
                setFormState({ ...formState, temperature: value })
              }
            />
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <Label htmlFor='top_p'>Top P: </Label>
              {formState.top_p}
            </div>
            <Slider
              id='top_p'
              name='top_p'
              min={0}
              max={1}
              step={0.01}
              value={[formState.top_p]}
              onValueChange={(value) =>
                setFormState({ ...formState, top_p: value })
              }
            />
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <Label htmlFor='presence_penalty'>Presence penalty: </Label>
              {formState.presence_penalty}
            </div>
            <Slider
              id='presence_penalty'
              name='presence_penalty'
              min={-2}
              max={2}
              step={0.01}
              value={[formState.presence_penalty]}
              onValueChange={(value) =>
                setFormState({ ...formState, presence_penalty: value })
              }
            />
          </div>

          <div>
            <div className='flex items-center justify-between'>
              <Label htmlFor='frequency_penalty'>Frequency penalty: </Label>
              {formState.frequency_penalty}
            </div>
            <Slider
              id='frequency_penalty'
              name='frequency_penalty'
              min={-2}
              max={2}
              step={0.01}
              value={[formState.frequency_penalty]}
              onValueChange={(value) =>
                setFormState({ ...formState, frequency_penalty: value })
              }
            />
          </div>

          <div className='flex items-center justify-between'>
            <Label htmlFor='response_format'>JSON response:</Label>
            <Switch
              id='response_format'
              name='response_format'
              checked={formState.response_format}
              onCheckedChange={() =>
                setFormState({
                  ...formState,
                  response_format: !formState.response_format,
                })
              }
            />
          </div>
          <SubmitButton />
        </form>
      </TabsContent>

      <TabsContent value='image'>Coming soon...</TabsContent>
      <TabsContent value='voice'>Coming soon...</TabsContent>
    </Tabs>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <LoadingButton type='submit' loading={pending} className='mt-2 w-full'>
      Save
    </LoadingButton>
  );
}
