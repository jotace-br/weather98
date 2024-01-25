import { lazy } from 'react';
import SearchBar from '~/containers/SearchBar';

const WeatherInfo = lazy(() => import('~/containers/WeatherInfo'));

const Inner = () => {
  return (
    <main>
      <SearchBar />
      <WeatherInfo />
    </main>
  );
};

export default Inner;
