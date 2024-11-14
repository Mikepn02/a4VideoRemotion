import { AbsoluteFill, Img } from 'remotion'
import { z } from 'zod'


import { colorVar } from '../../lib/helpers'
import { Color } from '../../types'
import { defineBackground } from '../define'

export const ImageBackground = defineBackground({
  type: 'image',
  description: 'Just a background image',
  schema: z.object({
    background: z.string().optional(),
    image: z.string(),
  }),
  component: ({ style, background, image }) => {
    return (
      <AbsoluteFill style={{ overflow: 'hidden', background: "#000", ...style }}>
        <Img src={image} style={{ width: '100%', height: '100%' }} />
      </AbsoluteFill>
    )
  },
})
