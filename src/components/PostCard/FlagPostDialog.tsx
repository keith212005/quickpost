import { useState } from 'react';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Textarea } from '../ui/textarea';

type FlagPostDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
};

export default function FlagPostDialog({
  open,
  onClose,
  onSubmit,
}: FlagPostDialogProps) {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    onSubmit(reason);
    setReason('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Flag Post</DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder='Enter reason for flagging this post'
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <DialogFooter className='mt-4'>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={!reason.trim()} onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
