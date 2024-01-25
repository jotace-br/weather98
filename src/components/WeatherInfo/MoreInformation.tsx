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
        <div className='grid grid-cols-2 grid-rows-2 gap-2 mb-2'>
          <div>
            <p>Pressure: </p>
            <div className='min-w-[100px] w-full shadow-inside px-2'>
              <p>{pressure}hPa</p>
            </div>
          </div>

          <div>
            <p>Visibility: </p>
            <div className='min-w-[100px] w-full shadow-inside px-2'>
              <p>{(visibility || 1 / 1000).toFixed(1)}Km</p>
            </div>
          </div>

          <div>
            <p>Humidity: </p>
            <div className='min-w-[100px] w-full shadow-inside px-2'>
              <p>{humidity}%</p>
            </div>
          </div>

          <div>
            <p>Wind speed: </p>
            <div className='min-w-[100px] w-full shadow-inside px-2'>
              <p>{windSpeed}m/s</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default MoreInformation;
