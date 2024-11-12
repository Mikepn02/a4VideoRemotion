import {
  AbsoluteFill,
  Video,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import a4video from "../../public/assets/BBQ_converted.mp4"

type A4VideoCompositionProps = {
  text: string;
  imageSrc: string;
  bgColor: string;
};



export const A4VideoComposition: React.FC<A4VideoCompositionProps> = ({
  text,
  imageSrc,
  bgColor,
}) => {
  const frame = useCurrentFrame();

  const { fps } = useVideoConfig();

  const backgroundOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const textScale = spring({
    frame,
    fps,
    from: 0.5,
    to: 1,
    durationInFrames: 30,
  });

  const imageSlide = spring({
    frame,
    fps,
    from: -200,
    to: 0,
    durationInFrames: 45,
  });

  return (
    <AbsoluteFill
      style={{ backgroundColor: bgColor, opacity: backgroundOpacity }}
    >
      <Video src={a4video} />

      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "10%",
          transform: `scale(${textScale})`,
          color: "white",
          fontSize: "48px",
        }}
      >
        {text}
      </div>

      <img
        src={imageSrc}
        style={{
          position: "absolute",
          top: "20%",
          left: `${imageSlide}px`,
          width: "200px",
        }}
      />
    </AbsoluteFill>
  );
};
