import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import '~/fonts/MSSansSerif.ttf';
import '~/fonts/MSSansSerifBold.ttf';
import { TaskbarProvider } from '~/providers/TaskbarProvider.tsx';
import { WeatherSettingsProvider } from '~/providers/WeatherSettingsProvider.tsx';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WeatherSettingsProvider>
      <TaskbarProvider>
        <App />
      </TaskbarProvider>
    </WeatherSettingsProvider>
  </StrictMode>
);
