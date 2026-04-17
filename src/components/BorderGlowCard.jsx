import { useRef, useState, useCallback } from 'react';
import './BorderGlowCard.css';

const BorderGlowCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`border-glow-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer glow layer — sits behind the card to create the border glow */}
      <div
        className="border-glow-outer"
        style={{
          background: `radial-gradient(
            250px circle at ${coords.x}px ${coords.y}px,
            rgba(0, 194, 255, 0.35),
            rgba(10, 102, 194, 0.15) 40%,
            transparent 70%
          )`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Inner card surface — inset to reveal glow as a "border" */}
      <div className="border-glow-inner">
        {/* Inner glow bleed — subtle light that bleeds into card edges */}
        <div
          className="border-glow-bleed"
          style={{
            background: `radial-gradient(
              300px circle at ${coords.x}px ${coords.y}px,
              rgba(0, 194, 255, 0.06),
              transparent 60%
            )`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Card content */}
        <div className="border-glow-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BorderGlowCard;
