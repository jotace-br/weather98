import CelsiusIcon from '~/assets/Icons/CelsiusIcon.png';
import FarenheitIcon from '~/assets/Icons/FarenheitIcon.png';
import PrimaryBtn from '~/components/Button/PrimaryBtn';
import Search from '~/components/Input/Search';
import useWeatherSettings from '~/contexts/UseWeatherSettings';
import changeUnit from '~/utils/ChangeUnits';
import getCurrentTempName from '~/utils/getCurrentTempName';

const SearchBar = () => {
  const { unit, selectedCity, updateUnit, handleUnitChange } =
    useWeatherSettings();
  const isDisabled = !selectedCity?.name;

  const handleTempChange = () => {
    updateUnit(changeUnit(unit));
    handleUnitChange();
  };

  return (
    <div className='flex flex-col justify-between gap-1 sm:flex-row sm:gap-[10px] sm:items-center'>
      <Search />
      <PrimaryBtn
        isDisabled={isDisabled}
        onClick={handleTempChange}
        hasIcon
        icon={
          getCurrentTempName(unit) === 'Celsius' ? FarenheitIcon : CelsiusIcon
        }
      >
        Change to <span className='capitalize'>{changeUnit(unit)}</span>
      </PrimaryBtn>
    </div>
  );
};

export default SearchBar;