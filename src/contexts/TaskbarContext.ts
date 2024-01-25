import { createContext } from 'react';

interface TaskbarContextProps {
  isWeatherVisible: boolean;
  setIsWeatherVisible: React.Dispatch<React.SetStateAction<boolean>>;
  buttonStyle: React.CSSProperties;
  setButtonStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
  changeButtonState: () => void;
}

const TaskbarContext = createContext<TaskbarContextProps | undefined>(
  undefined
);

export default TaskbarContext;
