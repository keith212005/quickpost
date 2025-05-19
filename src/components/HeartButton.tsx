import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';

type HeartButtonProps = {
  isLikedByUser: boolean;
  onClick: () => void;
};

export const HeartButton = ({ isLikedByUser, onClick }: HeartButtonProps) => {
  return (
    <motion.div
      whileTap={{ scale: 1.3 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Heart
        className={`h-4 w-4 cursor-pointer text-red-500 ${isLikedByUser ? 'fill-red-500' : ''}`}
        onClick={onClick}
      />
    </motion.div>
  );
};
