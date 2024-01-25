import ReactDOM from 'react-dom/client';
import '~/fonts/MSSansSerif.ttf';
import '~/fonts/MSSansSerifBold.ttf';
import App from './App.tsx';
import './index.css';
import { TaskbarProvider } from './providers/TaskbarProvider.tsx';
import { WeatherSettingsProvider } from './providers/WeatherSettingsProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <WeatherSettingsProvider>
    <TaskbarProvider>
      <App />
    </TaskbarProvider>
  </WeatherSettingsProvider>
);
