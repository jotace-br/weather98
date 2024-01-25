import { useEffect, useState } from 'react';
import useTaskbarContext from '~/contexts/UseTaskbarContext';

const Taskbar = () => {
  const { isWeatherVisible, buttonStyle, changeButtonState } =
    useTaskbarContext();
  const [currentTime, setCurrentTime] = useState(getFormattedTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function getFormattedTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  return (
    <nav className='absolute flex h-[28px] left-0 right-0 bottom-0 z-[5] py-0.5 border-t-[1px] border-[#dfdfdf] bg-[silver] shadow-[inset 0 1px #fff] overflow-hidden'>
      <div className='w-full flex'>
        <div className='basis-[10px]'>
          <div className='h-full w-[3px] shadow-taskbar mx-1'></div>
        </div>

        <div className='w-full flex justify-between text-[0.688rem]'>
          <button
            onClick={changeButtonState}
            style={buttonStyle}
            className='bg-[red] relative max-w-[150px] max-h-[23px] overflow-hidden px-0 text-left mr-1 flex-1 basis-auto cursor-pointer'
          >
            <img
              src='./Icons/weather98-icon.png'
              alt='weather98 icon'
              width='16px'
              height='16px'
              className='absolute w-4 h-4 left-[3px] top-[3px]'
            />
            <span
              className={`flex pl-6 pt-0.5 overflow-hidden overflow-ellipsis whitespace-nowrap ${
                isWeatherVisible ? 'font-ms-bold' : 'font-ms-medium'
              }`}
            >
              Weather98
            </span>
          </button>

          <div className='flex items-center text-nowrap px-2 pt-[2.5px] mr-0.5 border-1px border-t-[gray] border-l-[gray] border-r-white border-b-white'>
            {currentTime}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Taskbar;
