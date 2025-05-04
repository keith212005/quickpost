import Link2 from 'next/link';
import React from 'react';

const Link = ({ href, label }) => {
  return (
    <Link2
      href='/dashboard'
      className='font-semibold text-black dark:text-white'
    >
      Feed
    </Link2>
  );
};

export default Link;
