import { capitalize } from 'lodash';
import { useTranslation } from 'react-i18next';
import CelsiusIcon from '~/assets/Icons/CelsiusIcon.png';
import FarenheitIcon from '~/assets/Icons/FarenheitIcon.png';
import PrimaryBtn from '~/components/Button/PrimaryBtn';
import Search from '~/components/Input/Search';
import useWeatherSettings from '~/contexts/UseWeatherSettings';
import changeUnit from '~/utils/ChangeUnit';
import displayUnit from '~/utils/DisplayUnit';
import GetCurrentTempName from '~/utils/GetCurrentTempName';

const SearchBar = () => {
  const { unit, selectedCity, updateUnit } = useWeatherSettings();
  const { t } = useTranslation();

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
        tailwindStyles='sm:w-[32%]'
      >
        {t('searchContainer.changeTo', {
          unit: capitalize(displayUnit(unit)),
        })}
      </PrimaryBtn>
    </div>
  );
};

export default SearchBar;
