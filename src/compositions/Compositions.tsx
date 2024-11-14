// src/compositions/A4VideoComposition.tsx

import { AbsoluteFill, Audio, staticFile, useVideoConfig } from "remotion";
import { z } from "zod";
import { getCSSVariables } from "../lib/helpers";
import Scene1, { scene1Schema } from "./Scene1";
import { Colors, Fonts } from "../types";
import { BackgroundProps } from "../backgrounds";
import { LoadFonts } from "../lib/LoadFonts";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { wipe } from "@remotion/transitions/wipe";
import { fade } from "@remotion/transitions/fade";
import Scene2, { scene2Schema } from "./Scene2";
import Scene3, { scene3Schema } from "./Scene3";
import Scene4, { scene4Schema } from "./Scene4";
import Scene5, { scene5Schema } from "./Scene5";

export const MainSchema = z.object({
  audioVolume: z.number(),
  music: z.string(),
  colors: Colors,
  fonts: Fonts,
  background: BackgroundProps,
  transitionDuration: z.number(),
  scene1Duration: z.number(),
  scene1Props: scene1Schema,
  scene2Props: scene2Schema,
  scene2Duration: z.number(),
  scene3Duration: z.number(),
  scene3Props: scene3Schema,
  scene4Duration: z.number(),
  scene4Props: scene4Schema,
  scene5Props: scene5Schema,
  scene5Duration: z.number(),
});

type A4VideoCompositionProps = z.infer<typeof MainSchema>;

export const A4VideoComposition: React.FC<A4VideoCompositionProps> = ({
  audioVolume,
  transitionDuration,
  colors,
  background,
  fonts,
  scene1Duration,
  scene1Props,
  scene2Duration,
  scene2Props,
  scene3Duration,
  scene3Props,
  scene4Duration,
  scene4Props,
  scene5Duration,
  scene5Props,
}) => {
  const { id } = useVideoConfig();

  return (
    <LoadFonts fonts={fonts}>
      <AbsoluteFill
        id={id}
        style={{
          background: "",
          ...getCSSVariables({ colors: colors, fonts: fonts, roundness: 1 }),
        }}
      >
        <Audio src={staticFile("music.mp3")} volume={audioVolume} />
        <TransitionSeries>
          <TransitionSeries.Sequence durationInFrames={scene1Duration}>
            <Audio src={staticFile("VO_1.mp3")} />
            <Scene1 {...scene1Props} background={background} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            presentation={wipe({ direction: "from-right" })}
            timing={linearTiming({ durationInFrames: transitionDuration / 2 })}
          />

          <TransitionSeries.Sequence durationInFrames={scene2Duration}>
            <Audio src={staticFile("VO_2.mp3")} />
            <Scene2 {...scene2Props} background={background} />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={wipe({ direction: "from-left" })}
            timing={linearTiming({ durationInFrames: transitionDuration / 2 })}
          />

          <TransitionSeries.Sequence durationInFrames={scene3Duration}>
            <Audio src={staticFile("VO_3.mp3")} />
            <Scene3 {...scene3Props} background={background} />
          </TransitionSeries.Sequence>
          <TransitionSeries.Transition
            presentation={wipe({ direction: "from-left" })}
            timing={linearTiming({ durationInFrames: transitionDuration / 2 })}
          />

          <TransitionSeries.Sequence durationInFrames={scene4Duration}>
            <Audio src={staticFile("VO_4.mp3")} />
            <Scene4 {...scene4Props} background={background} />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={wipe({ direction: "from-left" })}
            timing={linearTiming({ durationInFrames: transitionDuration / 2 })}
          />

          <TransitionSeries.Sequence durationInFrames={scene5Duration}>
          <Audio src={staticFile("VO_5.mp3")} />
            <Scene5 {...scene5Props} background={background} />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </AbsoluteFill>
    </LoadFonts>
  );
};
