import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./A4Video/Logo";
import { A4VideoComposition } from "./A4Video/A4VideoComponent";
import qr from "../public/assets/images/QR.png"

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
      id="A4VideoComposition"
      component={A4VideoComposition}
      durationInFrames={180} 
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        text: "Hello from A4Video!",
        imageSrc: qr,
        bgColor: "#000000",
      }}
    />
    </>
  );
};
