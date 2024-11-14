import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { BackgroundProps } from "../backgrounds";
import TranslateContent from "../components/animations/TranslateContent";
import { colorVar, defaultSpring, interpolateSpring } from "../lib/helpers";
import { Background } from "../components/Background";
import { HEIGHT } from "../lib/consts";
import { useTextSplitter } from "../lib/useTextSplitter";

export const scene1Schema = z.object({
  logo: z.string(),
  title: z.string(),
  subtitle: z.string(),
  img: z.string(),
});

type Scene1Props = z.infer<typeof scene1Schema> & {
  background: BackgroundProps;
};

const Scene: React.FC<Scene1Props> = (props) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const spring = defaultSpring({ frame, durationInFrames: 180 });
  const progress = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleTranslate = interpolate(frame, [30, 60], [50, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background {...props.background} />

      <Img
        src={props.img}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          scale: `${interpolateSpring(spring, [1.17, 1.3])}`,
        }}
      />

      <AbsoluteFill
        style={{
          height: HEIGHT,
          minWidth: "100%",
          fontSize: 80,
          fontWeight: "800",
          textAlign: "center",
          color: "white",
          padding: "200px 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TranslateContent
          startFrom={70}
          duration={30}
          color="white"
          direction="from-bottom"
          style={{
            fontSize: 30,
            letterSpacing: 8,
            marginBottom: 20,
          }}
        >
          ★ ★ <span style={{ fontSize: 48 }}>★</span> ★ ★
        </TranslateContent>

        <TranslateContent
          startFrom={70}
          duration={30}
          color="white"
          direction="from-right"
          style={{
            left: "12%",
            translate: "-50%",
          }}
        >
          <div
            style={{
              width: "70%",
              height: 5,
              backgroundColor: "white",
              margin: "10px 0",
              opacity: progress,
            }}
          />
        </TranslateContent>

        <TranslateContent
          startFrom={70}
          duration={30}
          color="white"
          direction="from-right"
          style={{
            fontSize: 100,
            width: "100%",
            fontWeight: "bold",
            margin: "20px 0",
            color: "white",
          }}
        >
          Smoke Show{" "}
          <span
            style={{
              color: "red",
            }}
          >
            BBQ
          </span>
        </TranslateContent>

        <TranslateContent
          startFrom={70}
          duration={30}
          color="white"
          direction="from-right"
          style={{
            left: "12%",
            translate: "-50%",
          }}
        >
          <div
            style={{
              width: "70%",
              height: 5,
              backgroundColor: "white",
              opacity: progress,
            }}
          />
        </TranslateContent>

        <TranslateContent
          startFrom={70}
          duration={30}
          color="white"
          direction="from-bottom"
          style={{
            fontSize: 35,
            letterSpacing: 5,
            color: "gray",
            marginTop: 10,
          }}
        >
          {props.subtitle}
        </TranslateContent>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export default Scene;
