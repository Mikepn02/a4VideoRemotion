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
import { Easing } from "remotion";

export const scene2Schema = z.object({
  img: z.string(),
  qrCode: z.string(),
  backgroundImg: z.string(),
  mainImg: z.string(),
  title: z.string(),
});

type Scene2Props = z.infer<typeof scene2Schema> & {
  background: BackgroundProps;
};

const Scene2: React.FC<Scene2Props> = (props) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();
  const progress = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const slowRotation = interpolate(frame, [0, durationInFrames * 5], [0, 360], {
    extrapolateLeft: "extend",
    extrapolateRight: "extend",
  });

  const qrCodeSpring = spring({ frame, fps, config: { damping: 10 } });
  const titleSpring = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12 },
  });
  const mainImgSpring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12 },
  });
  const qrCodeTranslateX = interpolate(qrCodeSpring, [0, 1], [-100, 20]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);
  const titleScale = interpolate(titleSpring, [0, 1], [0.8, 1]);
  const mainImgOpacity = interpolate(mainImgSpring, [0, 1], [0, 1]);
  const mainImgScale = interpolate(mainImgSpring, [0, 1], [0.9, 1]);

  const mainImgRotation = interpolate(mainImgSpring, [0, 1], [0, -10], {
    easing: Easing.inOut(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleRotation = interpolate(titleSpring, [0, 1], [0, -10], {
    easing: Easing.inOut(Easing.ease),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#1c1c1c" }}>
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
          top: "20px",
          left: `${qrCodeTranslateX}px`,
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
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          color: "white",
          textAlign: "center",
          paddingTop: "5%",
        }}
      >
        <div style={{ width: "100%" }}>
          <TranslateContent
            startFrom={70}
            duration={30}
            color="white"
            direction="from-right"
            style={{
              width: "30%",
              left: "30%",
              height: 5,
              backgroundColor: "white",
              margin: "10px 0",
              opacity: progress,
              transform: `rotate(${titleRotation}deg)`,
            }}
          >
            <div />
          </TranslateContent>

          <div
            style={{
              fontSize: "80px",
              fontWeight: "bold",
              textTransform: "uppercase",
              textDecorationThickness: "2px",
              letterSpacing: "2px",
              width: "100%",
              marginBottom: "20px",
              opacity: titleOpacity,
              transform: `scale(${titleScale}) rotate(${titleRotation}deg)`,
            }}
          >
            {props.title}
          </div>

          <TranslateContent
            startFrom={70}
            duration={30}
            color="white"
            direction="from-left"
            style={{
              width: "30%",
              left: "34%",
              height: 5,
              backgroundColor: "white",
              margin: "10px 0",
              opacity: progress,
              transform: `rotate(${titleRotation}deg)`,
            }}
          >
            <div />
          </TranslateContent>
        </div>
        <Img
          src={props.mainImg}
          alt="Main Image"
          style={{
            width: "50%",
            height: "auto",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
            opacity: mainImgOpacity,
            transform: `scale(${mainImgScale}) rotate(${slowRotation}deg)`,
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Scene2;
