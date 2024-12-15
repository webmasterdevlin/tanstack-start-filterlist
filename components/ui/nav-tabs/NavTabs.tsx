import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function NavTabs({ children }: Props) {
  return <div className="flex gap-6 overflow-auto">{children}</div>;
}
