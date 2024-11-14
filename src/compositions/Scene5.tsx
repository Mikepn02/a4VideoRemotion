import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { BackgroundProps } from "../backgrounds";
import TranslateContent from "../components/animations/TranslateContent";
import { useTextSplitter } from "../lib/useTextSplitter";
import { HEIGHT } from "../lib/consts";
import { TitleText } from "../components/animations/TitleText";
import { Background } from "../components/Background";

export const scene5Schema = z.object({
  img: z.string(),
  qrCode: z.string(),
  backgroundImg: z.string(),
  title: z.string(),
});

type Scene5Props = z.infer<typeof scene5Schema> & {
  background: BackgroundProps;
};

const Scene5: React.FC<Scene5Props> = (props) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const progress = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const qrCodeSpring = spring({ frame, fps, config: { damping: 10 } });
  const qrCodeTranslateX = interpolate(qrCodeSpring, [0, 1], [-100, 20]);

  const getLineSplit = (line: string) => {
    return useTextSplitter({
      text: line.toUpperCase(),
      fontSize: 200,
      fontWeight: "700",
      letterSpacing: "6px",
      maxLines: 1,
      maxWidth: 1000,
    });
  };

  const line1Split = getLineSplit(props.title);

  return (
    <AbsoluteFill>
      <Background {...props.background} />
      <Img
        src={props.backgroundImg}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.6,
          position: "absolute",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "2rem",
          left: `${qrCodeTranslateX}px`,
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        <Img
          src={props.qrCode}
          alt="QR Code"
          style={{
            width: "300px",
            height: "300px",
          }}
        />
      </div>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          paddingTop: "5%",
        }}
      >
        <Img
          src={props.img}
          alt="logo"
          style={{
            width: "50%",
            height: "auto",
            alignSelf: "center",
          }}
        />

        {/* Title Text */}
        <div
          style={{
            paddingTop: "1.5rem",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TitleText
            text={line1Split.text}
            startAt={35}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Scene5;
