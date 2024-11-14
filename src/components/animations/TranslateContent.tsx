import React, { CSSProperties, useMemo } from 'react';
import { colorVar, defaultSpring, interpolateSpring } from '../../lib/helpers';
import { useCurrentFrame } from 'remotion';
import { Color } from '../../types';

type TranslateProps = {
  children: React.ReactNode;
  style?: CSSProperties;
  direction: 'from-left' | 'from-right' | 'from-top' | 'from-bottom' | 'from-left-bottom' | 'from-right-bottom';
  color: Color;
  startFrom?: number;
  duration?: number;
  letterByLetter?: boolean;
};

const TranslateContent: React.FC<TranslateProps> = ({
  children,
  style,
  direction,
  color,
  startFrom = 0,
  duration = 30,
  letterByLetter = false,
}) => {
  const frame = useCurrentFrame();
  const letters = String(children).split(''); // Split children into letters
  const spring = defaultSpring({ frame: frame - startFrom, durationInFrames: duration });
  const logoTranslate = interpolateSpring(spring, [0, 1]);

  const getTransform = (index: number) => {
    const delay = letterByLetter ? frame - (startFrom + index * 5) : frame - startFrom;
    const spring = defaultSpring({ frame: delay, durationInFrames: duration });
    const translate = interpolateSpring(spring, [0, 1]);
    
    switch (direction) {
      case 'from-left':
        return `translateX(${(1 - translate) * -100}%)`;
      case 'from-right':
        return `translateX(${(1 - translate) * 100}%)`;
      case 'from-top':
        return `translateY(${(1 - translate) * -100}%)`;
      case 'from-bottom':
        return `translateY(${(1 - translate) * 100}%)`;
      case 'from-left-bottom':
        return `translate(${(1 - translate) * -100}%, ${(1 - translate) * 100}%)`;
      case 'from-right-bottom':
        return `translate(${(1 - translate) * 100}%, ${(1 - translate) * 100}%)`;
    }
  };

  return (
    <div
      style={{
        zIndex: 1,
        width: "100%",
        overflow: "hidden",
        position: "relative",
        fontWeight: 400,
        textAlign: "center",
        color: colorVar(color),
        lineHeight: 1,
        ...style,
      }}
    >
      {letterByLetter ? (
        letters.map((letter, index) => (
          <span
            key={index}
            style={{
              display: "inline-block",
              textTransform: "uppercase",
              transform: getTransform(index),
              transition: "transform 0.3s ease",
            }}
          >
            {letter}
          </span>
        ))
      ) : (
        <span style={{ display: "block", textTransform: "uppercase", transform: getTransform(0) }}>
          {children}
        </span>
      )}
    </div>
  );
};

export default TranslateContent;
