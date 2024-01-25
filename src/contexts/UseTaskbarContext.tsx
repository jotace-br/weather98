import { useContext } from 'react';
import TaskbarContext from './TaskbarContext';

const useTaskbarContext = () => {
  const context = useContext(TaskbarContext);
  if (!context) {
    throw new Error('useTaskbarContext must be used within a TaskbarProvider');
  }
  return context;
};

export default useTaskbarContext;
