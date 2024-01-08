import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoadingButton from '@/components/ui/loadingButton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { conversationSchema } from '@/lib/validation/conversation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function NewConversation({ open, setOpen }) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(conversationSchema),
    defaultValues: {
      subject: '',
      model: 'gpt-3.5-turbo',
    },
  });

  async function onSubmit(input) {
    try {
      const res = await fetch('/api/conversations', {
        method: 'POST',
        body: JSON.stringify(input),
      });

      if (!res.ok) throw new Error('Status code ', res.status);
      form.reset();
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.log(error);
      alert('Something went wrong, please try again.');
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Conversation</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
            <FormField
              control={form.control}
              name='subject'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Leave blank to auto generate'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='model'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(val) => field.onChange(val)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select Model' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='gpt-3.5-turbo'>
                          GPT-3.5 Turbo
                        </SelectItem>
                        <SelectItem value='gpt-4'>GPT-4</SelectItem>
                        <SelectItem value='gpt-4-turbo'>GPT-4 Turbo</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <LoadingButton
                type='submit'
                loading={form.formState.isSubmitting}
              >
                Submit
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
