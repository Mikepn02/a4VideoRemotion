import React, { CSSProperties } from 'react'
import { useCurrentFrame } from 'remotion'
import { defaultSpring, interpolateSpring } from '../../lib/helpers'

const TextFromTop: React.FC<{ text: string, style?: CSSProperties }> = ({ text, style }) => {
    const frame = useCurrentFrame()

    const spring = defaultSpring({ frame, durationInFrames: 30 })

    return (
      <div
        style={{
            color: "white",
            display: 'inline-block',
            opacity: `${interpolateSpring(spring, [0, 1])}`,
            transform: `translateY(${interpolateSpring(spring, [-100, 0])}px)`,
            ...style
        }}
      >
        {text}
      </div>
    )
}

export default TextFromTop