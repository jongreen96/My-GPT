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
import { CogIcon } from 'lucide-react';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import LoadingButton from './ui/loadingButton';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import ThemeToggleButton from './ui/themeToggle';

export default function DefaultSettingsForm({ user }) {
  const models = Object.entries(openAIModels);

  const [settings, setSettings] = useState(user?.settings || {});

  return (
    <>
      <div className='mb-4 flex items-center'>
        <Label htmlFor='theme'>Theme: </Label>
        <ThemeToggleButton />
      </div>
      <Tabs defaultValue='chat' className='w-full'>
        <TabsList className='w-full'>
          <TabsTrigger value='chat' className='w-full'>
            Chat
          </TabsTrigger>

          <TabsTrigger value='image' className='w-full'>
            Image
          </TabsTrigger>

          <TabsTrigger value='audio' className='w-full'>
            Audio
          </TabsTrigger>
        </TabsList>

        <TabsContent value='chat'>
          <form
            action={updateDefaultChatSettingsAction}
            className='flex flex-col gap-2'
          >
            <div>
              <Label htmlFor='default_model'>Default Model</Label>
              <Select name='model' defaultValue={settings.model}>
                <SelectTrigger>
                  <SelectValue placeholder={settings.model}></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {models
                    .filter(
                      (model) =>
                        model[1].type === 'chat' || model[1].type === 'vision',
                    )
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
                defaultValue={settings.system_message}
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
                  Number(settings.max_tokens) === 0 ? '' : settings.max_tokens
                }
                placeholder='unlimited'
              />
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <Label htmlFor='temperature'>Temperature: </Label>
                {settings.temperature}
              </div>
              <Slider
                id='temperature'
                name='temperature'
                min={0}
                max={2}
                step={0.1}
                value={[settings.temperature]}
                onValueChange={(value) =>
                  setSettings({ ...settings, temperature: value })
                }
              />
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <Label htmlFor='top_p'>Top P: </Label>
                {settings.top_p}
              </div>
              <Slider
                id='top_p'
                name='top_p'
                min={0}
                max={1}
                step={0.01}
                value={[settings.top_p]}
                onValueChange={(value) =>
                  setSettings({ ...settings, top_p: value })
                }
              />
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <Label htmlFor='presence_penalty'>Presence penalty: </Label>
                {settings.presence_penalty}
              </div>
              <Slider
                id='presence_penalty'
                name='presence_penalty'
                min={-2}
                max={2}
                step={0.01}
                value={[settings.presence_penalty]}
                onValueChange={(value) =>
                  setSettings({ ...settings, presence_penalty: value })
                }
              />
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <Label htmlFor='frequency_penalty'>Frequency penalty: </Label>
                {settings.frequency_penalty}
              </div>
              <Slider
                id='frequency_penalty'
                name='frequency_penalty'
                min={-2}
                max={2}
                step={0.01}
                value={[settings.frequency_penalty]}
                onValueChange={(value) =>
                  setSettings({ ...settings, frequency_penalty: value })
                }
              />
            </div>

            <div className='flex items-center justify-between'>
              <Label htmlFor='response_format'>JSON response:</Label>
              <Switch
                id='response_format'
                name='response_format'
                checked={settings.response_format}
                onCheckedChange={() =>
                  setSettings({
                    ...settings,
                    response_format: !settings.response_format,
                  })
                }
              />
            </div>

            <div className='flex items-center justify-between'>
              <Label htmlFor='high_res_vision'>High res vision:</Label>
              <Switch
                id='high_res_vision'
                name='high_res_vision'
                checked={settings.high_res_vision}
                onCheckedChange={() =>
                  setSettings({
                    ...settings,
                    high_res_vision: !settings.high_res_vision,
                  })
                }
              />
            </div>
            <SubmitButton />
          </form>
        </TabsContent>

        <TabsContent value='image'>
          <div className='flex items-center justify-center gap-2 pt-2'>
            <CogIcon className='h-6 w-6 animate-spin text-muted-foreground' />
            <p>Coming soon...</p>
          </div>
        </TabsContent>
        <TabsContent value='audio'>
          <div className='flex items-center justify-center gap-2 pt-2'>
            <CogIcon className='h-6 w-6 animate-spin text-muted-foreground' />
            <p>Coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </>
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
