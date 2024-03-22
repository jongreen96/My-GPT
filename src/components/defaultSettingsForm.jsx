'use client';

import {
  updateDefaultChatSettingsAction,
  updateDefaultImageSettingsAction,
} from '@/app/actions';
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
            className='flex flex-col gap-4'
          >
            <div className='space-y-1'>
              <Label htmlFor='default_model'>Default Model</Label>

              <p className='text-xs text-brand'>ID of the model to use.</p>

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

            <div className='space-y-1'>
              <Label htmlFor='system_message'>System message:</Label>

              <p className='text-xs text-brand'>
                The system message is sent to the model before the user&apos;s
                message. It can be used to provide context or instructions to
                the model.
              </p>

              <Input
                id='system_message'
                name='system_message'
                defaultValue={settings.system_message}
              />
            </div>

            <div className='space-y-1'>
              <Label htmlFor='max_tokens'>Max tokens:</Label>

              <p className='text-xs text-brand'>
                The maximum number of tokens that can be generated in the chat
                completion. The total length of input tokens and generated
                tokens is limited by the model&apos;s context length.
              </p>

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

            <div className='space-y-1'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='temperature'>Temperature: </Label>
                {settings.temperature}
              </div>

              <p className='text-xs text-brand'>
                What sampling temperature to use, between 0 and 2. Higher values
                like 0.8 will make the output more random, while lower values
                like 0.2 will make it more focused and deterministic. We
                generally recommend altering this or top_p but not both.
                (Default: 1)
              </p>

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

            <div className='space-y-1'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='top_p'>Top P: </Label>
                {settings.top_p}
              </div>

              <p className='text-xs text-brand'>
                An alternative to sampling with temperature, called nucleus
                sampling, where the model considers the results of the tokens
                with top_p probability mass. So 0.1 means only the tokens
                comprising the top 10% probability mass are considered. We
                generally recommend altering this or temperature but not both.
                (Default: 1)
              </p>

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

            <div className='space-y-1'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='presence_penalty'>Presence penalty: </Label>
                {settings.presence_penalty}
              </div>

              <p className='text-xs text-brand'>
                Number between -2.0 and 2.0. Positive values penalize new tokens
                based on whether they appear in the text so far, increasing the
                model&apos;s likelihood to talk about new topics. (Default: 0)
              </p>

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

            <div className='space-y-1'>
              <div className='flex items-center justify-between'>
                <Label htmlFor='frequency_penalty'>Frequency penalty: </Label>
                {settings.frequency_penalty}
              </div>

              <p className='text-xs text-brand'>
                Number between -2.0 and 2.0. Positive values penalize new tokens
                based on their existing frequency in the text so far, decreasing
                the model&apos;s likelihood to repeat the same line verbatim.
                (Default: 0)
              </p>

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

            <div>
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

              <p className='text-xs text-brand'>
                An object specifying the format that the model must output.
                Compatible with GPT-4 Turbo and all GPT-3.5 Turbo models newer
                than gpt-3.5-turbo-1106. Setting to true enables JSON mode,
                which guarantees the message the model generates is valid JSON.
                Important: when using JSON mode, you must also instruct the
                model to produce JSON yourself via a system or user message.
                Without this, the model may generate an unending stream of
                whitespace until the generation reaches the token limit,
                resulting in a long-running and seemingly &quot;stuck&quot;
                request.
              </p>
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
          <form
            action={updateDefaultImageSettingsAction}
            className='flex flex-col gap-4'
          >
            <div className='space-y-1'>
              <Label htmlFor='model' className='w-40'>
                Model:
              </Label>
              <p className='text-xs text-brand'>
                The model to use for image generation.
              </p>
              <Select
                id='imageModel'
                name='imageModel'
                value={settings.imageModel}
                onValueChange={(value) =>
                  setSettings({
                    ...settings,
                    imageModel: value,
                    quality: 'standard',
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select a model'>
                    {settings.imageModel}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(openAIModels)
                    .filter((model) => openAIModels[model].type === 'image')
                    .map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-1'>
              <Label htmlFor='n' className='w-40'>
                Number of images:
              </Label>
              <p className='text-xs text-brand'>
                The number of images to generate. Must be between 1 and 10. For
                dall-e-3, only n=1 is supported.
              </p>
              <Select
                id='n'
                name='n'
                value={settings.n}
                onValueChange={(value) =>
                  setSettings({ ...settings, n: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select an amount'>
                    {settings.n}
                  </SelectValue>
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

            <div className='space-y-1'>
              <Label htmlFor='quality' className='w-40'>
                Quality:
              </Label>
              <p className='text-xs text-brand'>
                The quality of the image that will be generated. hd creates
                images with finer details and greater consistency across the
                image. This param is only supported for dall-e-3.
              </p>
              <Select
                id='quality'
                name='quality'
                value={
                  openAIModels[settings.imageModel].resTokens[settings.quality]
                    ? settings.quality
                    : setSettings({ ...settings, quality: 'standard' })
                }
                onValueChange={(value) =>
                  setSettings({ ...settings, quality: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select a quality'></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(openAIModels[settings.imageModel].resTokens).map(
                    (quality) => (
                      <SelectItem key={quality} value={quality}>
                        {quality}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-1'>
              <Label htmlFor='size' className='w-40'>
                Size:
              </Label>
              <p className='text-xs text-brand'>
                The size of the generated images. Must be one of 256x256,
                512x512, or 1024x1024 for dall-e-2. Must be one of 1024x1024,
                1792x1024, or 1024x1792 for dall-e-3 models.
              </p>
              <Select
                id='size'
                name='size'
                value={
                  openAIModels[settings.imageModel]?.resTokens[
                    settings.quality
                  ][settings.size]
                    ? settings.size
                    : setSettings({ ...settings, size: '1024x1024' })
                }
                onValueChange={(value) =>
                  setSettings({ ...settings, size: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select a size'></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(
                    openAIModels[settings.imageModel].resTokens[
                      settings.quality
                    ],
                  ).map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-1'>
              <Label htmlFor='style' className='w-40'>
                Style:
              </Label>
              <p className='text-xs text-brand'>
                The style of the generated images. Must be one of vivid or
                natural. Vivid causes the model to lean towards generating
                hyper-real and dramatic images. Natural causes the model to
                produce more natural, less hyper-real looking images. This param
                is only supported for dall-e-3.
              </p>
              <Select
                id='style'
                name='style'
                value={settings.style}
                onValueChange={(value) =>
                  setSettings({ ...settings, style: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select a style'></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='vivid'>Vivid</SelectItem>
                  <SelectItem value='natural'>Natural</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <SubmitButton />
          </form>
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
