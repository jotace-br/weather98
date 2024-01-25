import CelsiusIcon from '~/assets/Icons/CelsiusIcon.png';
import FarenheitIcon from '~/assets/Icons/FarenheitIcon.png';
import PrimaryBtn from '~/components/Button/PrimaryBtn';
import Search from '~/components/Input/Search';
import useWeatherSettings from '~/contexts/UseWeatherSettings';
import changeUnit from '~/utils/ChangeUnits';
import GetCurrentTempName from '~/utils/GetCurrentTempName';

const SearchBar = () => {
  const { unit, selectedCity, updateUnit } = useWeatherSettings();
  const isDisabled = !selectedCity?.name;

  const handleTempChange = () => {
    updateUnit(changeUnit(unit));
  };

  return (
    <div className='flex flex-col justify-between gap-1 sm:flex-row sm:gap-[10px] sm:items-center'>
      <Search />
      <PrimaryBtn
        isDisabled={isDisabled}
        onClick={handleTempChange}
        hasIcon
        icon={
          GetCurrentTempName(unit) === 'Celsius' ? FarenheitIcon : CelsiusIcon
        }
      >
        Change to <span className='capitalize'>{changeUnit(unit)}</span>
      </PrimaryBtn>
    </div>
  );
};

export default SearchBar;
