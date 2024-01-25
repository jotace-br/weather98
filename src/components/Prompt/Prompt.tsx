import { Howl } from 'howler';
import { useLayoutEffect, useRef, useState } from 'react';
import errorIcon from '~/assets/Icons/ErrorIcon.png';
import PrimaryBtn from '~/components/Button/PrimaryBtn';
import Draggable from '~/components/Draggable/Draggable';
import Window from '~/components/Window';
import HeaderActions from '~/components/Window/HeaderActions';

export interface ErrorProps {
  message: string | null;
  icon?: string;
  onClick?: () => void;
}

const Prompt = ({ message = null, icon = errorIcon, onClick }: ErrorProps) => {
  const draggableTriggerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useLayoutEffect(() => {
    if (message) {
      const sound = new Howl({
        src: ['./ErrorEffect.mp3'],
      });
      sound.play();

      const cleanup = () => {
        sound.unload();
      };

      return cleanup;
    }
  }, [message]);

  const handleOkClick = () => {
    setIsVisible(false);
    onClick?.();
  };

  return isVisible ? (
    <Draggable triggerRef={draggableTriggerRef}>
      <Window.Container tailwindStyles='z-10 sm:min-w-[192px] sm:w-max'>
        <Window.Header
          draggableTriggerRef={draggableTriggerRef}
          title='Error'
          hasNavItems={false}
        >
          <HeaderActions.Wrapper>
            <HeaderActions.Minimize isDisabled />
            <HeaderActions.Maximize isDisabled />
            <HeaderActions.Close onClick={handleOkClick} />
          </HeaderActions.Wrapper>
        </Window.Header>
        <div className='pt-[0.625rem] px-4 mt-1'>
          <div className='flex items-center gap-4'>
            <img
              src={icon}
              alt='icon'
              width='32px'
              height='32px'
              className='object-cover'
            />
            <p className='text-sm text-balance sm:text-[0.688rem]'>{message}</p>
          </div>

          <div className='mt-2 mb-3 flex justify-center'>
            <PrimaryBtn onClick={handleOkClick}>OK</PrimaryBtn>
          </div>
        </div>
      </Window.Container>
    </Draggable>
  ) : null;
};

export default Prompt;
