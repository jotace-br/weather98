import React, {
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

interface DraggableProps {
  children: ReactNode;
  triggerRef?: React.RefObject<HTMLElement>;
}

const Draggable = ({ children, triggerRef }: DraggableProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const initialOffset = useRef<{ x: number; y: number } | null>(null);
  const draggableRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const calculateInitialPosition = () => {
      const bodyWidth = document.body.clientWidth;
      const bodyHeight = document.body.clientHeight;

      if (draggableRef.current) {
        const draggableWidth = draggableRef.current.clientWidth;
        const draggableHeight = draggableRef.current.clientHeight;

        const initialX = (bodyWidth - draggableWidth) / 2;
        const initialY = (bodyHeight - draggableHeight) / 2;

        setPosition({ x: initialX, y: initialY });
      }
    };

    calculateInitialPosition();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && draggableRef.current && initialOffset.current) {
        const deltaX = e.clientX - initialOffset.current.x;
        const deltaY = e.clientY - initialOffset.current.y;

        const bodyWidth = document.body.clientWidth;
        const bodyHeight = document.body.clientHeight;

        const draggableWidth = draggableRef.current.clientWidth;
        const draggableHeight = draggableRef.current.clientHeight;

        const maxX = bodyWidth - draggableWidth;
        const maxY = bodyHeight - draggableHeight; // Adjust as needed

        const boundedX = Math.min(maxX, Math.max(0, deltaX));
        const boundedY = Math.min(maxY, Math.max(0, deltaY));

        setPosition({ x: boundedX, y: boundedY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (
      draggableRef.current &&
      triggerRef?.current &&
      triggerRef.current.contains(e.target as Node)
    ) {
      const boundingRect = draggableRef.current.getBoundingClientRect();
      const offsetX = e.clientX - boundingRect.left;
      const offsetY = e.clientY - boundingRect.top;

      setIsDragging(true);
      initialOffset.current = { x: offsetX, y: offsetY };
    }
  };

  return (
    <div
      className='absolute select-none z-50'
      ref={draggableRef}
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};

export default Draggable;
