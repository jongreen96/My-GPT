import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const markdownComponents = {
  pre: ({ node, ...props }) => (
    <>
      <div className='flex w-full justify-between rounded-t bg-[#1a1a1a] p-1 pl-2 text-white'>
        <p className='capitalize'>
          {node.children[0].properties['className']
            ? node.children[0].properties.className[0].slice(9)
            : 'code'}
        </p>
        {/* TODO: Add copy code button */}
      </div>
      <pre
        {...props}
        className='horizontal-scroll rounded-b bg-black p-2 text-white'
      />
    </>
  ),
  ol: ({ node, ...props }) => (
    <ol {...props} className='flex list-decimal flex-col gap-6 pl-6' />
  ),
  li: ({ node, ...props }) => <li {...props} className='whitespace-normal' />,
};
