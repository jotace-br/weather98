import { useRef } from 'react';
import downloadAnimation from '~/assets/Icons/DownloadAnimation.gif';
import PrimaryBtn from '~/components/Button/PrimaryBtn';
import Draggable from '~/components/Draggable/Draggable';
import Window from '~/components/Window';
import HeaderActions from '~/components/Window/HeaderActions';

const LoadingDiv = ({ count }: { count: number }) => {
  const divs = Array.from({ length: count }, (_, index) => (
    <div key={index} className='w-[6px] h-[9px] bg-[#000080] ml-[2px]'></div>
  ));

  return (
    <div className='w-full h-[13px] flex items-center shadow-inside overflow-hidden'>
      {divs}
    </div>
  );
};

const Loading = () => {
  const draggableTriggerRef = useRef<HTMLDivElement>(null);

  const redirectToMyGithub = () => {
    window.open('https://github.com/jotace-br', '_blank');
  };

  return (
    <Draggable triggerRef={draggableTriggerRef}>
      <Window.Container tailwindStyles='w-[374px]'>
        <Window.Header
          draggableTriggerRef={draggableTriggerRef}
          title='Loading content'
          hasNavItems={false}
        >
          <HeaderActions.Wrapper>
            <HeaderActions.Minimize isDisabled />
            <HeaderActions.Maximize isDisabled />
            <HeaderActions.Close isDisabled />
          </HeaderActions.Wrapper>
        </Window.Header>

        <div className='flex flex-col p-4 text-[0.688rem] select-text'>
          <img src={downloadAnimation} alt='download animation' width='300px' />
          <p className='mt-2'>Saving:</p>
          <p>weather.exe from openweatherapi.org</p>

          <LoadingDiv count={26} />

          <div>
            <p className='mt-1'>
              Estimated time left:{' '}
              <span className='ml-2'>39 years (8,89MB of 180MB copied)</span>
            </p>
            <p>
              Download to:{' '}
              <span className='ml-7'>D:\GitHub\jotace-br\Weather98.exe</span>
            </p>
            <p>
              Transfer rate: <span className='ml-[1.75rem]'>4,61 KB/Sec</span>
            </p>
          </div>

          <div className='flex gap-2 mt-1.5 select-none'>
            <input className='hidden' type='checkbox' id='close-dialog' />
            <label className='flex' htmlFor='close-dialog'>
              <div className='bg-white w-[13px] h-[13px] shadow-checkbox border border-[#808080] border-b-white border-r-white mr-2'></div>
              <span className='text-gray-700'>
                Close this dialog box when download completes
              </span>
            </label>
          </div>

          <div className='mt-8 flex justify-end gap-3'>
            <PrimaryBtn isDisabled tailwindStyles='w-fit sm:w-fit px-7'>
              Open
            </PrimaryBtn>
            <PrimaryBtn
              onClick={redirectToMyGithub}
              tailwindStyles='w-fit sm:w-fit px-4'
            >
              Open Folder
            </PrimaryBtn>
            <PrimaryBtn isDisabled tailwindStyles='w-fit sm:w-fit px-6'>
              Cancel
            </PrimaryBtn>
          </div>
        </div>
      </Window.Container>
    </Draggable>
  );
};

export default Loading;
