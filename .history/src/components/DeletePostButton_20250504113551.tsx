import React from 'react';

import { Button } from './ui/button';

type DatePostButtonProps = {
  postId: string;
};

const DeletePostButton = ({ id }) => {
  return <Button variant='destructive'>Delete</Button>;
};

export default DeletePostButton;
