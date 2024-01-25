import { HTMLProps, ReactNode } from 'react';

interface PrimaryBtnProps {
  children: string | ReactNode;
  onClick?: () => void;
  isDisabled?: boolean;
  hasIcon?: boolean;
  icon?: string;
  tailwindStyles?: HTMLProps<HTMLElement>['className'];
}

const PrimaryBtn = ({
  isDisabled = false,
  onClick = () => null,
  hasIcon = false,
  icon,
  children,
  tailwindStyles = '',
}: PrimaryBtnProps) => {
  return (
    <button
      className={`text-sm w-full h-[30px] sm:w-[30%] gap-1 p-1 bg-gray flex justify-center place-items-center shadow-normal border-1.5px border-b-black border-r-black  border-t-white border-l-white sm:text-[0.6875rem] ${tailwindStyles} ${
        isDisabled
          ? 'cursor-not-allowed text-gray2 shadow-none grayscale'
          : 'cursor-pointer active:shadow-active active:border-1px active:border-black active:outline-dotted active:outline-1 active:outline-black active:border-b-white active:border-r-white active:outline-offset-[-5px]'
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
      <p className='text-sm flex items-center gap-0.5 sm:text-[0.688rem]'>
        {children}
      </p>
    </button>
  );
};

export default PrimaryBtn;
