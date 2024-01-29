'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { IsDesktop } from '@/lib/hooks';
import { Settings2 } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';

export default function ChatSettingsPopover({ settings, setSettings }) {
  const isDesktop = IsDesktop();

  if (isDesktop) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size='icon'
            variant='secondary'
            className='aspect-square self-end rounded-full'
          >
            <Settings2 className='text-brand' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='mb-2 ml-[68px] w-fit bg-background p-2'>
          <h2 className='mb-3 font-semibold'>Chat Settings</h2>
          {innerContent(settings, setSettings)}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          size='icon'
          variant='secondary'
          className='aspect-square self-end rounded-full'
        >
          <Settings2 className='text-brand' />
        </Button>
      </DrawerTrigger>
      <DrawerContent className='p-2'>
        <DrawerHeader>
          <DrawerTitle>Chat Settings</DrawerTitle>
        </DrawerHeader>
        {innerContent(settings, setSettings)}
      </DrawerContent>
    </Drawer>
  );
}

function innerContent(settings, setSettings) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between gap-2'>
        <Label htmlFor='model' className='w-40'>
          Model:{' '}
        </Label>
        <Select
          value={settings.model}
          onValueChange={(value) => setSettings({ ...settings, model: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select a model'></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>GPT-4 Models</SelectLabel>

              <SelectItem value='gpt-4'>GPT-4</SelectItem>
              <SelectItem value='gpt-4-1106-preview'>GPT-4 Turbo</SelectItem>
              <SelectItem value='gpt-4-vision-preview'>
                GPT-4 Turbo with vision
              </SelectItem>
            </SelectGroup>

            <SelectGroup>
              <SelectLabel>GPT-3.5 Models</SelectLabel>

              <SelectItem value='gpt-3.5-turbo'>GPT-3.5 Turbo</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className='flex items-center justify-between gap-2'>
        <Label htmlFor='systemMessage' className='w-40'>
          System message:{' '}
        </Label>
        <Input
          id='systemMessage'
          value={settings.system_message}
          placeholder='Type system message here...'
          onChange={(e) =>
            setSettings({ ...settings, system_message: e.target.value })
          }
        />
      </div>

      <div className='flex items-center justify-between gap-2'>
        <Label htmlFor='maxTokens' className='w-40'>
          Max tokens:
        </Label>
        <Input
          id='maxTokens'
          type='number'
          min={0}
          value={Number(settings.max_tokens) === 0 ? '' : settings.max_tokens}
          placeholder='unlimited'
          onChange={(e) => {
            setSettings({ ...settings, max_tokens: e.target.value });
          }}
        />
      </div>

      <div className='flex items-center justify-between gap-2'>
        <Label htmlFor='temperature' className='w-40'>
          Temperature:{' '}
        </Label>
        {settings.temperature}
        <Slider
          id='temperature'
          min={0}
          max={2}
          defaultValue={[settings.temperature]}
          step={0.1}
          onValueChange={(value) =>
            setSettings({ ...settings, temperature: value[0] })
          }
        />
      </div>

      <div className='flex items-center justify-between gap-2'>
        <Label htmlFor='frequencyPenalty' className='w-40'>
          Frequency penalty:{' '}
        </Label>
        {settings.frequency_penalty}
        <Slider
          id='frequencyPenalty'
          min={-2}
          max={2}
          defaultValue={[settings.frequency_penalty]}
          step={0.1}
          onValueChange={(value) =>
            setSettings({ ...settings, frequency_penalty: value[0] })
          }
        />
      </div>

      <div className='flex items-center justify-between gap-2'>
        <Label htmlFor='presencePenalty' className='w-40'>
          Presence penalty:{' '}
        </Label>
        {settings.presence_penalty}
        <Slider
          id='presencePenalty'
          min={-2}
          max={2}
          defaultValue={[settings.presence_penalty]}
          step={0.1}
          onValueChange={(value) =>
            setSettings({ ...settings, presence_penalty: value[0] })
          }
        />
      </div>

      <div className='flex items-center justify-between gap-2'>
        <Label htmlFor='topP' className='w-40'>
          Top P:{' '}
        </Label>
        {settings.top_p}
        <Slider
          id='topP'
          min={0}
          max={1}
          defaultValue={[settings.top_p]}
          step={0.01}
          onValueChange={(value) =>
            setSettings({ ...settings, top_p: value[0] })
          }
        />
      </div>

      <div className='flex items-center justify-between gap-2'>
        <Label htmlFor='responseFormat' className='w-40'>
          JSON response:{' '}
        </Label>
        <Switch
          id='responseFormat'
          checked={settings.response_format}
          onCheckedChange={() =>
            setSettings({
              ...settings,
              response_format: !settings.response_format,
            })
          }
        />
      </div>
    </div>
  );
}
