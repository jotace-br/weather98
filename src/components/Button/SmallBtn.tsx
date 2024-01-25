import { HTMLProps, MouseEventHandler, ReactNode } from 'react';

export interface SmallBtnProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  isDisabled?: boolean;
  tailwindStyles?: HTMLProps<HTMLElement>['className'];
}

const SmallBtn = ({
  children,
  onClick,
  isDisabled = false,
  tailwindStyles,
}: SmallBtnProps) => (
  <button
    className={`w-4 h-4 bg-gray shadow-normal cursor-pointer flex justify-center place-items-center p-1 border-b-2 border-r-2 active:border-none ${tailwindStyles} ${
      isDisabled
        ? 'cursor-not-allowed text-gray2 shadow-none grayscale'
        : 'cursor-pointer active:shadow-clicked'
    }`}
    onClick={onClick}
    disabled={isDisabled}
  >
    <span>{children}</span>
  </button>
);

export default SmallBtn;
