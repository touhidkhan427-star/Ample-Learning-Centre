import React, { useState } from 'react';
import { cn } from '@/src/lib/utils';
import { useTheme } from './ThemeProvider';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  onClick?: () => void;
}

export default function SpotlightCard({ 
  children, 
  className, 
  spotlightColor,
  onClick
}: SpotlightCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();

  const defaultSpotlightColor = theme === 'dark' ? "rgba(96, 165, 250, 0.1)" : "rgba(0, 74, 173, 0.07)";
  const finalSpotlightColor = spotlightColor || defaultSpotlightColor;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${finalSpotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}
