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
import { Settings2 } from 'lucide-react';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';

export default function ChatSettingsPopover({ settings, setSettings }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size='icon' variant='secondary'>
          <Settings2 className='text-brand' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='mx-2 p-2'>
        <h2 className='mb-3 font-semibold'>Settings</h2>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center justify-between gap-2'>
            <Label htmlFor='model'>Model: </Label>
            <Select
              value={settings.model}
              onValueChange={(value) =>
                setSettings({ ...settings, model: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Select a model'></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>GPT-4</SelectLabel>

                  <SelectItem value='gpt-4'>GPT-4</SelectItem>
                  <SelectItem value='gpt-4-32k'>GPT-4 32k</SelectItem>
                  <SelectItem value='gpt-4-1106-preview'>
                    GPT-4 Turbo
                  </SelectItem>
                  <SelectItem value='gpt-4-vision-preview'>
                    GPT-4 Turbo with vision
                  </SelectItem>
                </SelectGroup>

                <SelectGroup>
                  <SelectLabel>GPT-3.5</SelectLabel>

                  <SelectItem value='gpt-3.5-turbo'>GPT-3.5 Turbo</SelectItem>
                  <SelectItem value='gpt-3.5-turbo-16k'>
                    GPT 3.5 Turbo 16k
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center justify-between gap-2'>
            <Label htmlFor='maxTokens'>Max tokens: </Label>
            <Input
              id='maxTokens'
              type='number'
              value={settings.max_tokens}
              onChange={(e) => {
                e.target.value === '0' || e.target.value === ''
                  ? setSettings({ ...settings, max_tokens: null })
                  : setSettings({ ...settings, max_tokens: e.target.value });
              }}
            />
          </div>

          <div className='flex items-center justify-between gap-2'>
            <Label htmlFor='temperature'>Temperature: </Label>
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
            <Label htmlFor='frequencyPenalty'>Frequency penalty: </Label>
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
            <Label htmlFor='responseFormat'>JSON response: </Label>
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
      </PopoverContent>
    </Popover>
  );
}
