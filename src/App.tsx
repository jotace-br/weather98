import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { fetchRandomWallpaper } from '~/api/api';
import Prompt from '~/components/Prompt/Prompt';
import Taskbar from '~/components/Taskbar/Taskbar';
import Window from '~/components/Window';

function App() {
  const [error, setError] = useState<string | null>(null);
  const initialized = useRef(false);

  useLayoutEffect(() => {
    const sound = new Howl({
      src: ['./Startup.mp3'],
      volume: 0.1,
    });
    sound.play();

    const cleanup = () => {
      sound.unload();
    };

    return cleanup;
  }, []);

  useEffect(() => {
    const getRandomWallpaper = async () => {
      try {
        const wallpaper = await fetchRandomWallpaper();
        const divToInsertWallpaper = document.getElementById('root');

        if (divToInsertWallpaper) {
          divToInsertWallpaper.style.backgroundImage = `url(${wallpaper.src})`;
        }
      } catch (error) {
        setError("Random wallpaper couldn't be fetched");
      }
    };

    if (!initialized.current) {
      initialized.current = true;
      getRandomWallpaper();
    }
  }, []);

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Window.Container>
        <Window.Header />
        <Window.Inner />
      </Window.Container>

      {error && <Prompt message={error} />}
      <Taskbar />
    </div>
  );
}

export default App;
