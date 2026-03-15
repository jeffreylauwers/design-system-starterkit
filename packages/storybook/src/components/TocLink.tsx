import React from 'react';
import { Link } from '@dsn/components-react';

interface TocLinkProps {
  targetId: string;
  children: React.ReactNode;
}

export function TocLink({ targetId, children }: TocLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Link href={`#${targetId}`} onClick={handleClick}>
      {children}
    </Link>
  );
}
