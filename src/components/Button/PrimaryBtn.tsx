import { HTMLProps, ReactNode } from 'react';

interface PrimaryBtnProps {
  children: string | ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
  hasIcon?: boolean;
  icon?: string;
  tailwindStyles?: HTMLProps<HTMLElement>['className'];
}

const PrimaryBtn = ({
  isDisabled = false,
  onClick,
  hasIcon = false,
  icon,
  children,
  tailwindStyles = '',
}: PrimaryBtnProps) => {
  return (
    <button
      className={`w-full h-[30px] sm:w-[30%] text-[0.6875rem] gap-1 p-1 bg-gray flex justify-center place-items-center shadow-normal border-[1.5px] border-b-black border-r-black  border-t-white border-l-white ${tailwindStyles} ${
        isDisabled
          ? 'cursor-not-allowed text-gray2 shadow-none grayscale'
          : 'cursor-pointer active:shadow-active active:border-1 active:border-black active:outline-dotted active:outline-1 active:outline-black active:border-b-white active:border-r-white active:outline-offset-[-5px]'
      }`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {hasIcon && (
        <img
          className='object-cover w-4'
          src={icon}
          alt='icon'
          width='16px'
          height='16px'
        />
      )}
      <p className='flex items-center text-[0.688rem] gap-0.5'>{children}</p>
    </button>
  );
};

export default PrimaryBtn;
