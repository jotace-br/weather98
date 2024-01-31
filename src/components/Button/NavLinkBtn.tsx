import { Fragment } from 'react';

export interface NavLinkBtnProps {
  text: string;
  onClick?: () => void;
}

const NavLinkBtn = ({ text, onClick = () => {} }: NavLinkBtnProps) => (
  <button
    onClick={onClick}
    className='text-sm text-textColor cursor-pointer p-1 hover:shadow-hover active:shadow-clicked sm:text-[0.6875rem]'
  >
    {text.split(' ').map((word, index) => (
      <Fragment key={index}>
        <span className='underline'>{word[0]}</span>
        {word.slice(1)}{' '}
      </Fragment>
    ))}
  </button>
);

export default NavLinkBtn;
