import React from 'react';
import Link2 from 'next/link';

type NavLinkProps = {
  href: string;
  label: string;
};

const NavLink = ({ href, label }: NavLinkProps) => {
  return (
    <Link2 href={href} className='font-semibold text-black dark:text-white'>
      {label}
    </Link2>
  );
};

export default NavLink;
