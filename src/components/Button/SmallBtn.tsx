import { HTMLProps, MouseEventHandler, ReactNode } from 'react';

export interface SmallBtnProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  isDisabled: boolean;
  tailwindStyles?: HTMLProps<HTMLElement>['className'];
}

const SmallBtn = ({
  children,
  onClick,
  isDisabled,
  tailwindStyles,
}: SmallBtnProps) => (
  <button
    className={`w-4 h-4 bg-gray shadow-normal cursor-pointer flex justify-center place-items-center p-1 border-b-[1.5px] border-r-[1.5px] active:border-none ${tailwindStyles}`}
    onClick={onClick}
    disabled={isDisabled}
    style={isDisabled ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
  >
    <span>{children}</span>
  </button>
);

export default SmallBtn;
