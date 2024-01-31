import { useLayoutEffect, useRef } from 'react';
import alertIcon from '~/assets/Icons/Information.png';
import PrimaryBtn from '~/components/Button/PrimaryBtn';
import Draggable from '~/components/Draggable/Draggable';
import Window from '~/components/Window';
import HeaderActions from '~/components/Window/HeaderActions';
import useWeatherSettings from '~/contexts/UseWeatherSettings';

interface ChangeLanguageProps {
  open: boolean;
  onClose: () => void;
}
export const ChangeLanguage = ({ open, onClose }: ChangeLanguageProps) => {
  const { language, changeLanguage } = useWeatherSettings();
  const draggableTriggerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (open) {
      const sound = new Howl({
        src: ['./AlertEffect.mp3'],
      });
      sound.play();

      const cleanup = () => {
        sound.unload();
      };

      return cleanup;
    }
  }, [open]);

  const handleChangeLang = (lang: string) => {
    changeLanguage(lang);
    onClose();
  };

  const handleOnCancel = () => {
    onClose();
  };

  return open ? (
    <Draggable triggerRef={draggableTriggerRef}>
      <Window.Container tailwindStyles='z-10 sm:min-w-[192px] sm:w-max'>
        <Window.Header
          draggableTriggerRef={draggableTriggerRef}
          title='Info'
          hasNavItems={false}
        >
          <HeaderActions.Wrapper>
            <HeaderActions.Minimize isDisabled />
            <HeaderActions.Maximize isDisabled />
            <HeaderActions.Close onClick={handleOnCancel} />
          </HeaderActions.Wrapper>
        </Window.Header>
        <div className='pt-[0.625rem] px-4 mt-1'>
          <div className='flex items-center gap-4'>
            <img
              src={alertIcon}
              alt='icon'
              width='32px'
              height='32px'
              className='object-cover'
            />
            <p className='text-sm text-balance sm:text-[0.688rem]'>
              Select your language (Current: {language})
            </p>
          </div>

          <div className='flex justify-center items-center gap-4 my-4'>
            <PrimaryBtn
              tailwindStyles='sm:w-full'
              onClick={() => handleChangeLang('en')}
            >
              English
            </PrimaryBtn>
            <PrimaryBtn
              tailwindStyles='sm:w-full'
              onClick={() => handleChangeLang('pt')}
            >
              pt-BR
            </PrimaryBtn>
          </div>
        </div>
      </Window.Container>
    </Draggable>
  ) : null;
};
