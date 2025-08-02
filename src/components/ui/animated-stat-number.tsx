"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedStatNumberProps {
  value: string;
  duration?: number;
  className?: string;
}

const AnimatedStatNumber = React.memo<AnimatedStatNumberProps>(({ 
  value, 
  duration = 2, 
  className = "" 
}) => {
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const animateValue = useCallback(() => {
    
    const numericPart = value.match(/[\d,]+\.?\d*/)?.[0] || "0";
    const suffix = value.replace(numericPart, "");
    const targetNumber = parseFloat(numericPart.replace(/,/g, ""));
    
    let startTime: number;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (targetNumber - startValue) * easeOutCubic;
      
      
      let formattedValue;
      if (numericPart.includes(",")) {
        formattedValue = Math.floor(currentValue).toLocaleString();
      } else if (numericPart.includes(".")) {
        formattedValue = currentValue.toFixed(1);
      } else {
        formattedValue = Math.floor(currentValue).toString();
      }
      
      setDisplayValue(formattedValue + suffix);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
});

export default AnimatedStatNumber;
