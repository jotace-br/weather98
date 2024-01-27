import { useEffect, useState } from 'react';
import Hourglass from '~/assets/Icons/Hourglass.gif';

interface WeatherIconProps {
  icon?: string;
}

const WeatherIcon = ({ icon }: WeatherIconProps) => {
  const [loading, setLoading] = useState(true);
  const iconUrl = icon ? `https://openweathermap.org/img/w/${icon}.png` : '';

  useEffect(() => {
    if (iconUrl) {
      const image = new Image();
      image.src = iconUrl;
      image.onload = () => setLoading(false);
    }
  }, [iconUrl]);

  return (
    <>
      {loading ? (
        <img
          src={Hourglass}
          alt='hourglass loading icon'
          width='50px'
          height='50px'
          className={`object-cover w-[50px] h-[50px]`}
        />
      ) : (
        <img
          src={iconUrl}
          alt='weather icon'
          width='50px'
          height='50px'
          className={`object-cover w-[50px] h-[50px] saturate-[1.5]`}
        />
      )}
    </>
  );
};

export default WeatherIcon;
