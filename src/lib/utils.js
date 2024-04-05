import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const markdownComponents = {
  pre: ({ node, ...props }) => (
    <>
      <div className='flex w-full justify-between rounded-t-lg border-b-2 border-[#333] bg-[#1a1a1a] p-1 px-2 text-white'>
        <p className='capitalize'>
          {node.children[0].properties['className']
            ? node.children[0].properties.className[0].slice(9)
            : 'code'}
        </p>
        {/* TODO: Add copy code button */}
      </div>
      <pre
        {...props}
        className='horizontal-scroll rounded-b-lg bg-black p-2 text-white'
      />
    </>
  ),
  ol: ({ node, ...props }) => (
    <ol {...props} className='flex list-decimal flex-col gap-6 pl-6' />
  ),
  ul: ({ node, ...props }) => (
    <ul {...props} className='flex list-disc flex-col gap-6 pl-6' />
  ),
  li: ({ node, ...props }) => <li {...props} className='whitespace-normal' />,
  h1: ({ node, ...props }) => <h1 {...props} className='text-4xl font-bold' />,
  h2: ({ node, ...props }) => <h2 {...props} className='text-3xl font-bold' />,
  h3: ({ node, ...props }) => <h3 {...props} className='text-2xl font-bold' />,
  code: ({ node, ...props }) => (
    <code
      {...props}
      className='my-[1px] inline-block rounded bg-black px-2 text-white'
    />
  ),
  blockquote: ({ node, ...props }) => (
    <blockquote
      {...props}
      className='my-2 border-l-2 border-brand pl-2 italic text-gray-500'
    />
  ),
  a: ({ node, ...props }) => (
    <a {...props} target='_blank' className='text-primary hover:underline' />
  ),
};

export const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
