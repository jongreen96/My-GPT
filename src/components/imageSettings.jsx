'use client';

import { IsDesktop } from '@/lib/hooks';
import { openAIModels } from '@/lib/openAI';
import { Settings2 } from 'lucide-react';
import { Button } from './ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function ImageSettingsPopover({
  settings,
  setSettings,
  started,
}) {
  if (started) return null;

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
        <PopoverContent className='mb-2 ml-[68px] w-fit min-w-[432px] bg-background p-2'>
          <h2 className='mb-3 font-semibold'>Image Settings</h2>
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
          <DrawerTitle>Image Settings</DrawerTitle>
        </DrawerHeader>
        {innerContent(settings, setSettings)}
      </DrawerContent>
    </Drawer>
  );
}

function innerContent(settings, setSettings) {
  const models = Object.keys(openAIModels).filter(
    (model) => openAIModels[model].type === 'image',
  );

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center justify-between gap-2'>
        <Label htmlFor='model' className='w-40'>
          Model:
        </Label>
        <Select
          value={settings.imageModel}
          onValueChange={(value) =>
            setSettings({ ...settings, imageModel: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Select a model'></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => (
              <SelectItem key={model} value={model}>
                {model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex items-center justify-between gap-2'>
        <Label htmlFor='model' className='w-40'>
          Number of images:
        </Label>
        <Select
          value={settings.n}
          onValueChange={(value) => setSettings({ ...settings, n: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select a model'></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, index) => (
              <SelectItem key={index + 1} value={index + 1}>
                {index + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className='flex items-center justify-between gap-2'>
        <Label htmlFor='model' className='w-40'>
          Size:
        </Label>
        <Select
          value={settings.size}
          onValueChange={(value) => setSettings({ ...settings, size: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select a model'></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {/* TODO: Add model specific options */}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
