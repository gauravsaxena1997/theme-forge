import React, { useState, useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
}

const Slider: React.FC<SliderProps> = ({
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className,
}) => {
  const [localValue, setLocalValue] = useState(value[0]);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocalValue(value[0]);
  }, [value]);

  const percentage = ((localValue - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setLocalValue(newValue);
    if (onValueChange) {
      onValueChange([newValue]);
    }
  };

  return (
    <div
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <div ref={trackRef} className="relative h-2 w-full grow overflow-hidden rounded-full bg-zinc-200">
        <div
          className="absolute h-full bg-blue-600"
          style={{ width: `${percentage}%` }}
        />
      </div>
       <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={localValue}
            onChange={handleChange}
            disabled={disabled}
            className="absolute w-full h-2 opacity-0 cursor-pointer"
        />
    </div>
  );
};

export { Slider };
