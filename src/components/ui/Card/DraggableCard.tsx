import React from "react";
import { useSpring, animated as a } from "react-spring";
import Card, { CardProps } from "./Card";

interface DraggableCardProps extends CardProps {
  children: React.ReactNode;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ children, style, ...props }) => {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0, config: { tension: 400, friction: 30 } }));
  const dragging = React.useRef(false);
  const offset = React.useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    offset.current = {
      x: e.clientX - x.get(),
      y: e.clientY - y.get(),
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return;
    api.start({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y, immediate: true });
  };

  const handleMouseUp = () => {
    dragging.current = false;
    api.start({ x: 0, y: 0, immediate: false }); // Snap back with bounce
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <a.div
      style={{ x, y, touchAction: "none", cursor: "grab", ...style }}
      onMouseDown={handleMouseDown}
      className="select-none"
    >
      <Card {...props}>{children}</Card>
    </a.div>
  );
};

export default DraggableCard; 