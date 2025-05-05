import React from 'react';

import { Button } from './ui/button';

type DatePostButtonProps = {
  postId: string;
};

const DeletePostButton = ({ postId }: DatePostButtonProps) => {
  return <Button variant='destructive'>Delete</Button>;
};

export default DeletePostButton;
