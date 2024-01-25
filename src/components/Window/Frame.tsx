import { ComponentProps, ReactNode } from 'react';

interface FrameProps {
  children: ReactNode;
  tailwindStyles?: ComponentProps<'div'>['className'];
}

const Frame = ({ children, tailwindStyles = '' }: FrameProps) => (
  <div
    className={`w-full h-full shadow-normal border-1px border-b-black border-r-black  border-t-white border-l-white ${tailwindStyles}`}
  >
    {children}
  </div>
);

export default Frame;
