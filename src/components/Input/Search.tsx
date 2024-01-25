import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { fetchCitiesOptions } from '~/api/api';
import searchIcon from '~/assets/Icons/SearchIcon.png';
import Prompt from '~/components/Prompt/Prompt';
import useWeatherSettings from '~/contexts/UseWeatherSettings';

export interface SearchProps {}

const Search = () => {
  const { unit, updateSelectedCity } = useWeatherSettings();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [searchValue, setSearchValue] = useState('');

  const handleKeyPress = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      try {
        updateSelectedCity(null);
        const results = await fetchCitiesOptions({
          city: searchValue,
          unit,
        });

        if (results.length === 0) {
          throw new Error(
            'Location Unavailable. Please retry with valid city name.'
          );
        }

        updateSelectedCity(results[0]);
      } catch (error) {
        if (error instanceof Error) {
          return setErrorMessage(error.message || 'An unknown error occurred.');
        }
        return setErrorMessage('An unknown error occurred.');
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <div className='w-full h-full bg-gray flex items-start justify-center gap-2'>
        <div className='relative w-full'>
          <span className='absolute top-0 bottom-0 left-0 mx-[6px] my-auto flex items-center justify-center'>
            <img src={searchIcon} alt='search icon' />
          </span>
          <input
            type='text'
            className='block w-full h-[30px] py-0.5 pr-1 pl-6 text-[0.6875rem] leading-6 shadow-input border-2 border-r-white border-b-white bg-white placeholder-gray-500 focus:outline-none focus:border-transparent'
            placeholder='Search for location'
            value={searchValue}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>

      {!!errorMessage && (
        <Prompt message={errorMessage} onClick={() => setErrorMessage(null)} />
      )}
    </>
  );
};

export default Search;
