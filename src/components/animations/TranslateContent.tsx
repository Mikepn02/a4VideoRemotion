import React, { CSSProperties, useMemo } from 'react'
import { colorVar, defaultSpring, interpolateSpring } from '../../lib/helpers';
import { useCurrentFrame } from 'remotion';
import { Color } from '../../types';

type TranslateProps = {
    children: React.ReactNode
    style?: CSSProperties
    direction: 'from-left' | 'from-right' | 'from-top' | 'from-bottom' | 'from-left-bottom' | 'from-right-bottom'
    color: Color
    startFrom?: number
    duration?: number
}

const TranslateContent: React.FC<TranslateProps> = ({
    children,
    style,
    direction,
    color,
    startFrom,
    duration
}) => {

    const frame = useCurrentFrame()
    const spring = defaultSpring({ frame: frame - (startFrom ?? 0), durationInFrames: duration ?? 30 })
    const logoTranslate = interpolateSpring(spring, [0, 1]);

    const transform = useMemo(() => {
        switch(direction) {
            case 'from-left':
                return `translateX(${(1 - logoTranslate) * -100}%)`
            case 'from-right':
                return `translateX(${(1 - logoTranslate) * 100}%)`
            case 'from-top':
                return `translateY(${(1 - logoTranslate) * -100}%)`
            case 'from-bottom':
                return `translateY(${(1 - logoTranslate) * 100}%)`
            case 'from-left-bottom':
                return `translate(${(1 - logoTranslate) * -100}%, ${(1 - logoTranslate) * 100}%)`
            case 'from-right-bottom':
                return `translate(${(1 - logoTranslate) * 100}%, ${(1 - logoTranslate) * 100}%)`
        }
    }, [direction, logoTranslate])

    return (
    <div style={{
        zIndex: 1,
        width: "400px",
        overflow: "hidden",
        position: "relative",
        fontWeight: 400,
        textAlign: "center",
        color: colorVar(color),
        lineHeight: 1,
        ...style
      }}>
      <span style={{
        display: "block",
        textTransform: "uppercase",
        transform: transform
      }} >{children}</span>
    </div>
  )
}

export default TranslateContent