import { ReactNode } from 'react';
import CloseIcon from '~/assets/Icons/CloseIcon';
import MaximizeIcon from '~/assets/Icons/MaximizeIcon';
import MinimizeIcon from '~/assets/Icons/MinimizeIcon';
import SmallBtn from '../Button/SmallBtn';

interface HeaderActionsWrapperProps {
  children: ReactNode;
}

const HeaderActionsWrapper = ({ children }: HeaderActionsWrapperProps) => (
  <nav className='flex z-[1] cursor-auto'>{children}</nav>
);

interface HeaderButtonsProps {
  isDisabled?: boolean;
  onClick?: () => void;
}

const MinimizeBtn = ({
  isDisabled = false,
  onClick = () => null,
}: HeaderButtonsProps) => (
  <SmallBtn
    onClick={onClick}
    tailwindStyles='items-end'
    isDisabled={isDisabled}
  >
    <MinimizeIcon />
  </SmallBtn>
);

const MaximizeBtn = ({
  isDisabled = false,
  onClick = () => null,
}: HeaderButtonsProps) => (
  <SmallBtn onClick={onClick} isDisabled={isDisabled}>
    <MaximizeIcon />
  </SmallBtn>
);

const CloseBtn = ({
  isDisabled = false,
  onClick = () => null,
}: HeaderButtonsProps) => (
  <SmallBtn onClick={onClick} tailwindStyles='ml-1' isDisabled={isDisabled}>
    <CloseIcon />
  </SmallBtn>
);

const HeaderActions = {
  Wrapper: HeaderActionsWrapper,
  Minimize: MinimizeBtn,
  Maximize: MaximizeBtn,
  Close: CloseBtn,
};

export default HeaderActions;
