interface ErrorProps {
  error: Error;
}

const Error = ({ error }: ErrorProps) => {
  return (
    <div className='p-4 bg-white rounded-lg shadow-md'>
      <p className='text-xl font-bold text-red-500'>{error.message}</p>
    </div>
  );
};

export default Error;
