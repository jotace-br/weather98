import { CSSProperties, ReactNode, useState } from 'react';
import taskbarBtnBg from '~/assets/Backgrounds/taskbar-bg.png';
import TaskbarContext from '~/contexts/TaskbarContext';

const commonStyle: CSSProperties = {
  border: '1px solid',
};

const defaultButtonStyle: CSSProperties = {
  ...commonStyle,
  fontWeight: 'bold',
  background: `url(${taskbarBtnBg})`,
  boxShadow:
    'inset -1px 0 #dfdfdf, inset -1px 1px gray, inset -1px -1px #dfdfdf, inset 0 0 0 1px gray',
  borderColor: 'black white white black',
};

const hiddenStyle: CSSProperties = {
  ...commonStyle,
  background: 'silver',
  boxShadow:
    'inset -1px 0 gray, inset -1px 1px #dfdfdf, inset -1px -1px gray, inset 0 0 0 1px #dfdfdf',
  borderColor: 'white black black white',
};

const TaskbarProvider = ({ children }: { children: ReactNode }) => {
  const [isWeatherVisible, setIsWeatherVisible] = useState(true);
  const [buttonStyle, setButtonStyle] =
    useState<CSSProperties>(defaultButtonStyle);

  const changeButtonState = () => {
    setIsWeatherVisible(!isWeatherVisible);

    setButtonStyle(isWeatherVisible ? hiddenStyle : defaultButtonStyle);
  };

  return (
    <TaskbarContext.Provider
      value={{
        isWeatherVisible,
        setIsWeatherVisible,
        buttonStyle,
        setButtonStyle,
        changeButtonState,
      }}
    >
      {children}
    </TaskbarContext.Provider>
  );
};

export { TaskbarProvider };
