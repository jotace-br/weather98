import { ReactNode } from 'react';
import useTaskbarContext from '~/contexts/UseTaskbarContext';

interface ContainerProps {
  children: ReactNode;
  tailwindStyles?: string;
}

const Container = ({ children, tailwindStyles = '' }: ContainerProps) => {
  const { isWeatherVisible } = useTaskbarContext();

  return (
    <div
      className={`${
        isWeatherVisible ? 'flex' : 'hidden'
      } justify-center w-full`}
    >
      <div
        className={`container-div w-full h-full p-1 bg-gray shadow-normal border-1.5px border-t-white border-l-white text-black cursor-auto sm:w-[525px] ${tailwindStyles}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
