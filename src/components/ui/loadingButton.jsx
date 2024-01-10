import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function LoadingButton({ children, loading, ...props }) {
  return (
    <Button {...props} disabled={props.disabled || loading}>
      {loading ? <Loader2 size={20} className='animate-spin' /> : children}
    </Button>
  );
}
