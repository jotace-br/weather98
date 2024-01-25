import Information from './Information';

export interface MoreInformationProps {
  pressure?: number;
  visibility?: number;
  humidity?: number;
  windSpeed?: number;
}

const MoreInformation = ({
  pressure,
  visibility,
  humidity,
  windSpeed,
}: MoreInformationProps) => (
  <div className='w-full flex flex-col flex-wrap items-center gap-2 mr-2'>
    <div className='w-full flex flex-col flex-wrap justify-center gap-2'>
      <section className='w-full'>
        <div className='grid grid-cols-1 grid-rows-2 gap-2 mb-2 sm:grid-cols-2'>
          <Information label='Pressure' info={`${pressure} hPa`} />
          <Information
            label='Visibility'
            info={`${visibility || 1 / 1000} Km`}
          />
          <Information label='Humidity' info={`${humidity}%`} />
          <Information label='Wind speed' info={`${windSpeed} m/s`} />
        </div>
      </section>
    </div>
  </div>
);

export default MoreInformation;
