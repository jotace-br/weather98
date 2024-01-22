import { FormEvent, useState } from 'react';
import { fetchCitiesOptions } from '~/api/api';
import { Search } from '~/types/Search';

interface SearchBarProps {
  setSelectedCity: (city: Search) => void;
  units: string;
}

const SearchBar = ({ setSelectedCity, units }: SearchBarProps) => {
  const [city, setCity] = useState('');
  const [results, setResults] = useState<Search[]>();

  const getFlagEmoji = (countryCode: string) => {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  };

  const fetchCity = async (city: string) => {
    try {
      const results = await fetchCitiesOptions({ city, units });
      setResults(results);
    } catch (error) {
      console.log('Error fetching weather data. Please try again.', error);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchCity(city);
  };

  const handleClickItem = (result: Search) => {
    setSelectedCity(result);
    setResults(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center'>
      <input
        type='text'
        placeholder='Enter city name'
        className='flex-1 py-2 px-4 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <ul>
        {(results || []).map((result: Search, index: number) => (
          <li key={index} onClick={() => handleClickItem(result)}>
            <p>
              {result.name} {getFlagEmoji(result.country)}
            </p>
            <p>
              ({result.lat}, {result.lon})
            </p>
          </li>
        ))}
      </ul>
      <button
        type='submit'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md'
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
