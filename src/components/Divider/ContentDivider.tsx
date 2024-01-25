import { ReactNode } from 'react';
import Divider from './Divider';

export interface ContentDividerProps {
  title: string;
  children: ReactNode;
}

export const ContentDivider = ({ title, children }: ContentDividerProps) => (
  <div className='flex flex-col gap-y-1'>
    <h1 className='font-ms-bold font-[0.688rem] text-textColor'>{title}</h1>

    <Divider />
    <div className='w-full h-full'>{children}</div>
    <Divider />
  </div>
);
