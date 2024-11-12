import {
    AbsoluteFill,
    Video,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
  } from "remotion";
  import { z } from "zod"
  import a4video from "../../public/assets/BBQ_converted.mp4"
  import { wipe } from "@remotion/transitions/wipe";
  import { fade } from "@remotion/transitions/fade";
  
  export const MainSchema = z.object({
    audioVolume: z.number(),
    music: z.string(),
    colors: Colors,
    fonts: Fonts,
    background:BackgroundProps,
    transitionDuration: z.number(),
    scene1Duration: z.number(),
    scene1Props: scene1Schema,
    scene2Duration: z.number(),
    scene2Props: scene2Schema,
    scene3Duration: z.number(),
    scene3Props: scene3Schema,
    scene4Duration: z.number(),
    scene4Props: scene4Schema,
    scene5Duration: z.number(),
    scene5Props: scene5Schema,
    scene6Duration: z.number(),
    scene6Props: scene6Schema,
  });
  
  type MainProps = z.infer<typeof MainSchema>;
  
  
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
  