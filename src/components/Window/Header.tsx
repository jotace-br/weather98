import { ReactNode, RefObject, useState } from 'react';
import NavLinkBtn from '~/components/Button/NavLinkBtn';
import Prompt from '~/components/Prompt/Prompt';
import useTaskbarContext from '~/contexts/UseTaskbarContext';
import HeaderActions from './HeaderActions';

interface HeaderProps {
  title?: string;
  draggableTriggerRef?: RefObject<HTMLDivElement>;
  hasNavItems?: boolean;
  children?: ReactNode;
}

const Header = ({
  title = 'Weather98',
  draggableTriggerRef,
  hasNavItems = true,
  children,
}: HeaderProps) => {
  const { changeButtonState } = useTaskbarContext();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFullscreenToggle = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document
        .getElementById('root')
        ?.requestFullscreen()
        .catch(() => {
          setErrorMessage('Failed to enter in fullscreen mode.');
        });
    }
  };

  return (
    <>
      <div
        ref={draggableTriggerRef}
        className={`w-full h-fit bg-gradient-to-r from-[#00007B] to-[#1085D2] p-0.5 flex justify-between items-center text-center`}
      >
        <p className='font-ms-bold text-white text-[0.6875rem]'>{title}</p>
        {children ? (
          children
        ) : (
          <HeaderActions.Wrapper>
            <HeaderActions.Minimize onClick={() => changeButtonState()} />
            <HeaderActions.Maximize onClick={() => handleFullscreenToggle()} />
            <HeaderActions.Close onClick={() => changeButtonState()} />
          </HeaderActions.Wrapper>
        )}
      </div>

      {hasNavItems && (
        <nav className='flex'>
          <NavLinkBtn text='File' />
          <NavLinkBtn text='Edit' />
          <NavLinkBtn text='View' />
          <NavLinkBtn text='Help' />
        </nav>
      )}

      {!!errorMessage && (
        <Prompt message={errorMessage} onClick={() => setErrorMessage(null)} />
      )}
    </>
  );
};

export default Header;
