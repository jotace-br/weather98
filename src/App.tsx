import { useState } from 'react';
import SearchBar from '~/components/SearchBar';
import WeatherDisplay from '~/components/WeatherDisplay';
import { Search } from '~/types/Search';

function App() {
  const [selectedCity, setSelectedCity] = useState<Search>();
  const [units, setUnits] = useState('metric');

  return (
    <div className='flex flex-col items-center min-h-screen py-2'>
      <h1 className='text-4xl font-ms-bold font-bold mb-4'>Weather App</h1>
      <SearchBar setSelectedCity={setSelectedCity} units={units} />
      <WeatherDisplay
        selectedCity={selectedCity}
        units={units}
        setUnits={setUnits}
      />
    </div>
  );
}

export default App;
