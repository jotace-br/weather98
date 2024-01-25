import { HTMLProps, MouseEventHandler, ReactNode } from 'react';

export interface SmallBtnProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  isDisabled: boolean;
  tailwindStyles?: HTMLProps<HTMLElement>['className'];
  ariaLabel: string;
}

const SmallBtn = ({
  children,
  onClick,
  isDisabled,
  tailwindStyles,
  ariaLabel,
}: SmallBtnProps) => (
  <button
    className={`w-4 h-4 bg-gray shadow-normal cursor-pointer flex justify-center place-items-center p-1 border-b-[1.5px] border-r-[1.5px] active:border-none ${tailwindStyles}`}
    onClick={onClick}
    disabled={isDisabled}
    style={isDisabled ? { cursor: 'not-allowed' } : { cursor: 'pointer' }}
    aria-label={ariaLabel}
  >
    <span>{children}</span>
  </button>
);

export default SmallBtn;
