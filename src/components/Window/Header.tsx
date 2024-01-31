import { t } from 'i18next';
import { ReactNode, RefObject, useState } from 'react';
import NavLinkBtn from '~/components/Button/NavLinkBtn';
import Prompt from '~/components/Prompt/Prompt';
import useTaskbarContext from '~/contexts/UseTaskbarContext';
import { ChangeLanguage } from '../ChangeLanguage/ChangeLanguage';
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
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);

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
        <p className='text-xs font-ms-bold text-white sm:text-[0.6875rem]'>
          {title}
        </p>
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
          <NavLinkBtn text={t('header.file')} />
          <NavLinkBtn text={t('header.edit')} />
          <NavLinkBtn
            text={t('header.changeLang')}
            onClick={() => setIsLanguageModalVisible(true)}
          />
          <NavLinkBtn text={t('header.help')} />
        </nav>
      )}

      {!!errorMessage && (
        <Prompt message={errorMessage} onClick={() => setErrorMessage(null)} />
      )}

      <ChangeLanguage
        open={isLanguageModalVisible}
        onClose={() => setIsLanguageModalVisible(false)}
      />
    </>
  );
};

export default Header;
