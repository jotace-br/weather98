export interface NavLinkBtnProps {
  text: string;
  onClick?: () => void;
}

const NavLinkBtn = ({ text, onClick = () => {} }: NavLinkBtnProps) => (
  <button
    onClick={onClick}
    className='text-sm text-textColor cursor-pointer p-1 hover:shadow-hover active:shadow-clicked sm:text-[0.6875rem]'
  >
    <span className='underline'>{text[0]}</span>
    {text.slice(1)}
  </button>
);

export default NavLinkBtn;
