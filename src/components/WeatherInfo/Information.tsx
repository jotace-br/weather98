export interface InformationProps {
  label: string;
  info: string;
}

const Information = ({ label, info }: InformationProps) => (
  <div>
    <p className='font-ms-bold'>{label}</p>
    <div className='min-w-[100px] w-full shadow-inside px-2'>
      <p className='text-textColor'>{info}</p>
    </div>
  </div>
);

export default Information;
